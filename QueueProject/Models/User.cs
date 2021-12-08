using System;
using System.Collections.Generic;

namespace QueueProject.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public DateTime DateBirth { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }
        public int? OfficeId { get; set; }
        public Office Office { get; set; }

        public List<Queue> Queues { get; set; } = new List<Queue>();
    }
}
