using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class BaseEntity
    {
        [Column(Order =0)]
        [Key]
        public Guid Id { get; set; }
        [Column(Order = 15)]
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        [Column(Order = 16)]
        public DateTime ModifiedOn { get; set; } = DateTime.UtcNow;
        [Column(Order =17)]
        public Guid ModifiedBy { get; set; }
        [Column(Order = 18)]
        public Boolean IsActive { get; set; } = true;
        [Column(Order = 19)]
        public Boolean IsDeleted { get; set; } = false;
    }
}
