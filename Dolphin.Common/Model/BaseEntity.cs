using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.Common.Model
{
    public class BaseEntity
    {
        [Column(Order =0)]
        [Key]
        public Guid Id { get; set; }
        [Column(Order = 10)]
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        [Column(Order = 11)]
        public DateTime ModifiedOn { get; set; }
        [Column(Order =12)]
        public Guid ModifiedBy { get; set; }
        [Column(Order = 13)]
        public Boolean IsActive { get; set; } = true;
        [Column(Order = 14)]
        public Boolean IsDeleted { get; set; } = false;
    }
}
