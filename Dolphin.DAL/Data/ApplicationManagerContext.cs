using Dolphin.DAL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Dolphin.DAL.Data
{
    public class ApplicationManagerContext : DbContext
    {
        public ApplicationManagerContext(DbContextOptions<ApplicationManagerContext> options):base(options)
        {

        }
        public DbSet<Tasks> tasks { get; set; }
        public DbSet<Project> projects { get; set; }
        public DbSet<Team> teams { get; set; }  
        public DbSet<User> users { get; set; }
        public DbSet<Role> roles { get; set; }
        public DbSet<UserDetails> userDetails { get; set; }
        public DbSet<TaskDetails> taskDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tasks>()
                .Property(t => t.Progress)
                .HasColumnType("decimal(18, 2)") // Adjust precision and scale as needed
                .HasPrecision(18, 2); // Optional, depending on your needs
        }
    }
}

