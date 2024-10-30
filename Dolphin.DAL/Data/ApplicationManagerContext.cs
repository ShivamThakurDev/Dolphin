using Dolphin.Common.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dolphin.DAL.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Dolphin.DAL.Data
{
    public class ApplicationManagerContext : IdentityDbContext<IdentityUser>
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
    }
}

