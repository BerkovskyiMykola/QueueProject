using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models
{
    public class Office
    {
        public int OfficeId { get; set; }
        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(256, MinimumLength = 0)]
        public string Description { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }

        public List<OfficeObject> OfficeObjects { get; set; } = new List<OfficeObject>();
        public List<User> Users { get; set; } = new List<User>();
    }
}
