using System;

namespace QueueProject.Services.Authorization.Models
{
    public class JwtUser
    {
        public Guid UserId { set; get; }
        public string Role { set; get; }
    }
}
