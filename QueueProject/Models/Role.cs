using System.Collections.Generic;

namespace QueueProject.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string Title { get; set; }

        public List<User> Users { get; set; } = new List<User>();
    }
}
