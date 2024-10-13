using System.ComponentModel.DataAnnotations.Schema;

namespace Dolphin.DAL.Model
{
    public class Project:BaseEntity
    {
        [Column(Order = 1)]
        public string Name { get; set; }
    }
}