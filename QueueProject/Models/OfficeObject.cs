using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models
{
    public class OfficeObject
    {
        public int OfficeObjectId { get; set; }
        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(256, MinimumLength = 0)]
        public string Description { get; set; }
        [Range(0, int.MaxValue)]
        public int Max_users { get; set; }

        public int OfficeId { get; set; }
        public Office Office { get; set; }

        public List<Queue> Queues { get; set; } = new List<Queue>();
    }
}
