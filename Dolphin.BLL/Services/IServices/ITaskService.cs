using Dolphin.BLL.Repository.IRepository;
using Dolphin.DAL.DTOs;
using Dolphin.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Services.IServices
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskResponseDto>> GetAllTasks();
        TaskResponseDto GetById(Guid id);
        void Add(TaskRequestDto taskDto);
        void Update(string id,TaskRequestDto taskDto);
        void Delete(Guid id);

    }
}
