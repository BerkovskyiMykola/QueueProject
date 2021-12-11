using System;
using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models.Request
{
    public class EditProfileRequest
    {
        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(256, MinimumLength = 0)]
        public string Description { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { get; set; }

        public DateTime DateBirth { get; set; }
    }
}
