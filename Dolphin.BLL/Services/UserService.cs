using AutoMapper;
using Dolphin.BLL.Repository.IRepository;
using Dolphin.BLL.Services.IServices;
using Dolphin.DAL.DTOs;
using Dolphin.DAL.Model;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Services
{
    public class UserService : IUserService
    {
        //private readonly IRepository<User> _userRepo;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public UserService(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
        }
        public void Add(UserRequestDto taskDto)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UserResponseDto>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public UserResponseDto GetById(string id)
        {
            throw new NotImplementedException();
        }

        public void Update(string id, UserRequestDto taskDto)
        {
            throw new NotImplementedException();
        }
    }
}
