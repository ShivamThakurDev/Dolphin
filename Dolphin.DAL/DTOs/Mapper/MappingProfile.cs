using AutoMapper;
using Dolphin.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.DAL.DTOs.Mapper
{
    public class MappingProfile:Profile
    {
        public MappingProfile() 
        {
            CreateMap<Tasks, TaskRequestDto>().ReverseMap();
            CreateMap<Tasks, TaskResponseDto>().ReverseMap();
        }

    }
}
