using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dolphin.DAL.Model;

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
    }
}

