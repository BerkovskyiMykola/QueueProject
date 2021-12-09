using System;
using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models.Request
{
    public class Profile
    {
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { get; set; }
        public DateTime DateBirth { get; set; }
    }
}
