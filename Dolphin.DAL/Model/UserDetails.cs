using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class UserDetails:BaseEntity
    {
        [Column(Order =0)]
        public Guid Id { get; set; }
        [Column(Order =1)]
        public Guid User_Id { get; set; }
        public virtual User User { get; set; }
        [Column(Order =2)]
        public Guid Role_Id { get; set; }
        public virtual Role Role { get; set; }
        [Column(Order =3)]
        public Guid Team_Id { get; set; }
        public virtual Team Team { get; set; }
    }
}
