using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;
using QueueProject.Models.Request;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperAdminController : ControllerBase
    {
        private readonly DataContext _context;
        public SuperAdminController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("backup")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Backup()
        {
            string dbname = _context.Database.GetDbConnection().Database;
            if (System.IO.File.Exists($"C:\\Backup\\{dbname}.bak"))
            {
                System.IO.File.Delete($"C:\\Backup\\{dbname}.bak");
            }
            string sqlCommand = $"BACKUP DATABASE {dbname} TO DISK = 'C:\\Backup\\{dbname}.bak'";
            await _context.Database.ExecuteSqlRawAsync(sqlCommand);
            return Ok();
        }

        [HttpGet("restore")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Restore()
        {
            string dbname = _context.Database.GetDbConnection().Database;
            string sqlCommand1 = $"USE master RESTORE DATABASE {dbname} FROM DISK = 'C:\\Backup\\{dbname}.bak'";
            await _context.Database.ExecuteSqlRawAsync(sqlCommand1);
            return Ok();
        }

        [HttpGet("addresses/all")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetAddresses()
        {
            return Ok(await _context.Addresses.ToListAsync());
        }

        [HttpPost("addresses/create")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> PostAddress(Address address)
        {
            _context.Addresses.Add(address);

            await _context.SaveChangesAsync();

            return Ok(address);
        }

        [HttpDelete("addresses/delete/{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var address = await _context.Addresses
                .Include(x => x.Offices)
                .ThenInclude(x => x.Users)
                .SingleOrDefaultAsync(x => x.AddressId == id);

            if (address == null)
            {
                return NotFound();
            }

            address.Offices.ForEach(x => x.Users.ForEach(user => _context.Users.Remove(user)));

            _context.Addresses.Remove(address);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("addresses/edit")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> PutAddress(Address model)
        {
            var address = await _context.Addresses.SingleOrDefaultAsync(x => x.AddressId == model.AddressId);

            if (address == null)
            {
                return NotFound();
            }

            address.Country = model.Country;
            address.City = model.City;
            address.Street = model.Street;
            address.PostalCode = model.PostalCode;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("offices/all/{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetOffices(int id)
        {
            var address = await _context.Addresses
                .Include(x => x.Offices).ThenInclude(x => x.Users.Where(x => x.RoleId == 2)).ThenInclude(x => x.Role)
                .SingleOrDefaultAsync(x => x.AddressId == id);

            if(address == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                addressName = $"{address.Country} {address.City} {address.Street} {address.PostalCode}",
                offices = address.Offices.Select(x => new
                {
                    x.OfficeId,
                    x.AddressId,
                    x.Name,
                    x.Description,
                    Admin = new
                    {
                        x.Users.FirstOrDefault()?.Lastname,
                        x.Users.FirstOrDefault()?.Firstname,
                        x.Users.FirstOrDefault()?.Email,
                        x.Users.FirstOrDefault()?.DateBirth,
                        Role = x.Users.FirstOrDefault()?.Role.Title
                    }
                })
            });
        }

        [HttpPost("offices/create")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> PostOffice(CreateOfficeRequest model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }

            var office = new Office
            {
                AddressId = model.AddressId,
                Name = model.Name,
                Description = model.Description
            };

            _context.Offices.Add(office);

            await _context.SaveChangesAsync();

            var user = new User
            {
                Lastname = model.Lastname,
                Email = model.Email,
                Firstname = model.Firstname,
                Password = GetPasswordHash(model.Password),
                Role = await _context.Roles.SingleOrDefaultAsync(x => x.Title == "Admin"),
                OfficeId = office.OfficeId
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok(new {
                office.OfficeId,
                office.AddressId, 
                office.Name,
                office.Description,
                Admin = new {
                    user.Lastname,
                    user.Firstname,
                    user.Email,
                    user.DateBirth,
                    Role = user.Role.Title
                }
            });
        }

        [HttpDelete("offices/delete/{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteOffice(int id)
        {
            var office = await _context.Offices
                .Include(x => x.Users)
                .SingleOrDefaultAsync(x => x.OfficeId == id);

            if (office == null)
            {
                return NotFound();
            }

            office.Users.ForEach(user => _context.Users.Remove(user));

            _context.Offices.Remove(office);

            await _context.SaveChangesAsync();

            return Ok();
        }

        private string GetPasswordHash(string password)
        {
            byte[] hash;
            using (var sha1 = new SHA256CryptoServiceProvider())
                hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);

        }
    }
}
