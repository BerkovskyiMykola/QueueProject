using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;
using QueueProject.Models.Request;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        public AdminController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("users/all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers()
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(await _context.Users
                .Where(x => x.UserId != user.UserId && x.OfficeId == user.OfficeId)
                .Select(x => new { x.UserId, x.Firstname, x.Lastname, x.Email, x.DateBirth })
                .ToListAsync());
        }

        [HttpDelete("users/delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("users/create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostUser(RegisterRequest model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }

            var userAdmin = await _context.Users.SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (userAdmin == null)
            {
                return NotFound();
            }

            var user = new User()
            {
                Lastname = model.Lastname,
                Firstname = model.Firstname,
                Email = model.Email,
                Password = GetPasswordHash(model.Password),
                RoleId = 3,
                OfficeId = userAdmin.OfficeId
            };

            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();

            return Ok(new { user.UserId, user.Firstname, user.Lastname, user.Email, user.DateBirth });
        }

        private string GetPasswordHash(string password)
        {
            byte[] hash;
            using (var sha1 = new SHA256CryptoServiceProvider())
                hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);

        }

        [HttpGet("OfficeObjects/all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetOfficeObjects()
        {
            var userAdmin = await _context.Users
                .Include(x => x.Office).ThenInclude(x => x.OfficeObjects)
                .SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (userAdmin == null)
            {
                return NotFound();
            }

            return Ok(userAdmin.Office.OfficeObjects.Select(x => new { x.OfficeObjectId, x.Name, x.Description, x.Max_users }));
        }

        [HttpDelete("users/delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteOfficeObject(int id)
        {
            var userAdmin = await _context.Users
                .Include(x => x.Office).ThenInclude(x => x.OfficeObjects.SingleOrDefault(x => x.OfficeObjectId == id))
                .SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (userAdmin == null)
            {
                return NotFound();
            }

            if (userAdmin.Office.OfficeObjects.FirstOrDefault() == null)
            {
                return NotFound();
            }

            _context.OfficeObjects.Remove(userAdmin.Office.OfficeObjects.FirstOrDefault());

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("users/create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostOfficeObject(OfficeObject model)
        {
            var userAdmin = await _context.Users.SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (userAdmin == null)
            {
                return NotFound();
            }

            model.OfficeId = (int)userAdmin.OfficeId;

            await _context.OfficeObjects.AddAsync(model);

            await _context.SaveChangesAsync();

            return Ok(new { model.OfficeId, model.Name, model.Description, model.Max_users });
        }
    }
}
