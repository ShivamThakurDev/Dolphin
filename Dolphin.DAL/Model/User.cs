using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class User : IdentityUser
    { 
        public string IpAddress { get; set; }
    }
}
