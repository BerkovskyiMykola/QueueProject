using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models
{
    public class Address
    {
        public int AddressId { get; set; } 
        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string Country { get; set; }
        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string City { get; set; }
        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string Street { get; set; }
        [Range(0, int.MaxValue)]
        public int PostalCode { get; set; }

        public List<Office> Offices { get; set; } = new List<Office>();
    }
}
