using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string Team_Role {  get; set; }
        [ForeignKey("Team_Id")]
        public int Team_Id { get; set; }
        public Team Team { get; set; }
    }
}
