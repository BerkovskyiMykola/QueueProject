using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace QueueProject.Models
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Office> Offices { get; set; }
        public DbSet<OfficeObject> OfficeObjects { get; set; }
        public DbSet<Queue> Queues { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(new Role()
            {
                RoleId = 1,
                Title = "SuperAdmin"
            },
            new Role()
            {
                RoleId = 2,
                Title = "Admin"
            },
            new Role()
            {
                RoleId = 3,
                Title = "Worker"
            });

            modelBuilder.Entity<Status>().HasData(new Status()
            {
                StatusId = 1,
                Title = "in queue"
            },
            new Status()
            {
                StatusId = 2,
                Title = "using"
            },
            new Status()
            {
                StatusId = 3,
                Title = "finished"
            });

            modelBuilder.Entity<User>().HasData(new User()
            {
                UserId = Guid.NewGuid(),
                Email = "GTA@gmail.com",
                Password = GetPasswordHash("ainz1111"),
                RoleId = 1,
            });
        }

        private string GetPasswordHash(string password)
        {
            byte[] hash;
            using (var sha1 = new SHA256CryptoServiceProvider())
                hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);
        }
    }
}
