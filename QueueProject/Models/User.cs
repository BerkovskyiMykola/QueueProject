using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { get; set; }
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { get; set; }
        public DateTime DateBirth { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }
        public int? OfficeId { get; set; }
        public Office Office { get; set; }

        public List<Queue> Queues { get; set; } = new List<Queue>();
    }
}
