using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class TaskDetails:BaseEntity
    {
        [Column(Order =0)]
        public int Id { get; set; }
        [Column(Order =1)]
        [ForeignKey("Task_Id")]
        public Guid Task_Id { get; set; }
        public  virtual Tasks Tasks { get; set; }
        [Column(Order =2)]
        public Guid? Parent_Id { get; set; }
        [ForeignKey("User_Id")]
        [Column(Order = 3)]
        public Guid User_Id { get; set; }
        public virtual User User { get; set; }
        [ForeignKey("Project_Id")]
        [Column(Order = 4)]
        public Guid Project_Id { get; set; }

        public virtual Project Project { get; set; }
    }
}
