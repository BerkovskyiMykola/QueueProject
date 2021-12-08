using System.Collections.Generic;

namespace QueueProject.Models
{
    public class OfficeObject
    {
        public int OfficeObjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Max_users { get; set; }

        public int OfficeId { get; set; }
        public Office Office { get; set; }

        public List<Queue> Queues { get; set; } = new List<Queue>();
    }
}
