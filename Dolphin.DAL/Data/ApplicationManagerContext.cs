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

        
    }
}

