using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class BaseEntity
    {
        [Column(Order =0)]
        public Guid Id { get; set; }
        [Column(Order =10)]
        public DateTime CreatedOn { get; set; }
        [Column(Order = 11)]
        public DateTime ModifiedOn { get; set; }
        [Column(Order =12)]
        public Guid ModifiedBy { get; set; }
        [Column(Order =13)]
        public Boolean IsActive { get; set; }
        [Column(Order =14)]
        public Boolean IsDeleted { get; set; }
    }
}
