using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;
using QueueProject.Services.Authorization;
using System.Security.Cryptography;
using System.Text;
using QueueProject.Services.Authorization.Models;
using Microsoft.AspNetCore.Authorization;
using QueueProject.Models.Request;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IJwtService _jwtService;

        public UsersController(DataContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }
            var user = new User()
            {
                Lastname = model.Lastname,
                Firstname = model.Firstname,
                Email = model.Email,
                Password = GetPasswordHash(model.Password),
                Role = await _context.Roles.SingleOrDefaultAsync(x => x.Title == model.Role)
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var token = _jwtService.GetToken(new JwtUser { UserId = user.UserId, Role = user.Role.Title });

            return Ok(new { token, user.UserId, user.Email, user.Role.Title });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var user = await _context.Users.Include(x => x.Role).SingleOrDefaultAsync(x => x.Email == model.Email);

            if (user == null || user.Password != GetPasswordHash(model.Password))
            {
                return BadRequest("Email or password is incorrect");
            }

            var token = _jwtService.GetToken(new JwtUser { UserId = user.UserId, Role = user.Role.Title });

            return Ok(new { token, user.UserId, user.Email, user.Role.Title });
        }

        [HttpGet("all")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _context.Users
                .Where(x => x.UserId.ToString() != HttpContext.User.Identity.Name)
                .Select(x => new { x.UserId, x.Firstname, x.Lastname, x.Email })
                .ToListAsync());
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
