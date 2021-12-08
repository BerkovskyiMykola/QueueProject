using System.Collections.Generic;

namespace QueueProject.Models
{
    public class Office
    {
        public int OfficeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }

        public List<OfficeObject> OfficeObjects { get; set; } = new List<OfficeObject>();
        public List<User> Users { get; set; } = new List<User>();
    }
}
