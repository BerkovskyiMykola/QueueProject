using System;
using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models.Request
{
    public class CreateOfficeRequest
    {
        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(256, MinimumLength = 0)]
        public string Description { get; set; }
        public int AddressId { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(18, MinimumLength = 8)]
        public string Password { get; set; }
    }
}
