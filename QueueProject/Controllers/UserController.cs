using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;
using QueueProject.Models.Request;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpPut("profile/edit")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> PutProfile(Profile model)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            user.Lastname = model.Lastname;
            user.Firstname = model.Firstname;
            user.DateBirth = model.DateBirth;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("inQueues/all")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> GetInQueues()
        {
            var user = await _context.Users.Include(x => x.Queues.Where(x => x.StatusId == 1)).SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Queues);
        }

        [HttpPost("queues/create")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> PostQueue(Queue queue)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            queue.UserId = user.UserId;
            queue.DateTimeCreate = DateTime.Now;
            queue.DateTimeUsing = default(DateTime);
            queue.DateTimeUsing = default(DateTime);
            queue.StatusId = 1;

            _context.Queues.Add(queue);

            await _context.SaveChangesAsync();

            return Ok(queue);
        }

        [HttpPut("queues/setUsing/{id}")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> SetUsingQueue(int id)
        {
            var user = await _context.Users.Include(x => x.Queues).SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (user == null && !user.Queues.Any(x => x.QueueId == id))
            {
                return NotFound();
            }

            var queue = user.Queues.SingleOrDefault(x => x.QueueId == id);
            queue.DateTimeUsing = DateTime.Now;
            queue.StatusId = 2;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("queues/setFinished/{id}")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> SetFinishedQueue(int id)
        {
            var user = await _context.Users.Include(x => x.Queues).SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (user == null && !user.Queues.Any(x => x.QueueId == id))
            {
                return NotFound();
            }

            var queue = user.Queues.SingleOrDefault(x => x.QueueId == id);
            queue.DateTimeFinish = DateTime.Now;
            queue.StatusId = 3;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("queues/all")]
        [Authorize(Roles = "Worker")]
        public async Task<IActionResult> GetAddresses()
        {
            var user = await _context.Users.Include(x => x.Queues).SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Queues);
        }
    }
}
