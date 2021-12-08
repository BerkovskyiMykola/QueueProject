using System.Collections.Generic;

namespace QueueProject.Models
{
    public class Address
    {
        public int AddressId { get; set; } 
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int PostalCode { get; set; }

        public List<Office> Offices { get; set; } = new List<Office>();
    }
}
