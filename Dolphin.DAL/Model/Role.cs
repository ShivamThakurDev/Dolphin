using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.Model
{
    public class Role : IdentityRole
    {
        public Role() : base()
        { }

        public Role(string roleName) : base(roleName)
        {
            NormalizedName = roleName?.ToUpper();
        }


    }
}
