using System.Collections.Generic;

namespace QueueProject.Models
{
    public class Status
    {
        public int StatusId { get; set; }
        public string Title { get; set; }

        public List<Queue> Queues { get; set; } = new List<Queue>();
    }
}
