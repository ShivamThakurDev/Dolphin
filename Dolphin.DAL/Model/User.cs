using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class User : BaseEntity
    {
        [Column(Order =  1)]
        public string First_Name { get; set; }
        [Column(Order = 2)]
        public string Last_Name { get; set; }
        [Column(Order = 3)]
        public string Email { get; set; }
        [Column(Order = 4)]
        public DateTime DOB { get; set; }
        [ForeignKey("Role_Id")]
        [Column(Order = 5)]
        public Role Role_Id {get;set;}
        public Role Role { get; set; }
        [Column(Order = 6)]
        public string Password { get; set; }
        [ForeignKey("Team_Id")]
        [Column(Order =7)]
        public int Team_Id { get; set; }
        public Team Team { get; set; }
        [Column(Order=8)]
        public DateTime Last_Login { get; set; }
    }
}
