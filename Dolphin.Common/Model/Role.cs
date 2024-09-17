using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.Common.Model
{
    public class Role
    {
        [Column(Order =0)]
        public Guid  Id { get; set; }
        [Column(Order =1)]
        public string Name { get; set; }
    }
}
