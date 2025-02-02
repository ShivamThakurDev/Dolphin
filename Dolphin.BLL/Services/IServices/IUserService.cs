using Dolphin.DAL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Services.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDto>> GetAllUsers();
        UserResponseDto GetById(string id);
        void Add(UserRequestDto taskDto);
        void Update(string id, UserRequestDto taskDto);
        void Delete(string id);
    }
}
