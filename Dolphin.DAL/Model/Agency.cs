using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class Agency:BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
