using Dolphin.DAL.Model;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Services.IServices
{
    public interface IUserService
    {
        Task<dynamic> Login(LoginModel model);
        Task<string> RegisterAdmin();

    }
}
