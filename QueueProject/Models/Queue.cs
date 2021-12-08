using System;

namespace QueueProject.Models
{
    public class Queue
    {
        public int QueueId { get; set; }

        public Guid? UserId { get; set; }
        public User User { get; set; }

        public int OfficeObjectId { get; set; }
        public OfficeObject OfficeObject { get; set; }

        public int StatusId { get; set; }
        public Status Status { get; set; }

        public DateTime DateTimeCreate { get; set; }
        public DateTime DateTimeUsing { get; set; }
        public DateTime DateTimeFinish { get; set; }
    }
}
