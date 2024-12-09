using AutoMapper;
using Dolphin.BLL.Repository.IRepository;
using Dolphin.BLL.Services.IServices;
using Dolphin.DAL.DTOs;
using Dolphin.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Services
{
    public class TaskService: ITaskService
    {
        private readonly IRepository<Tasks> _taskRepo;
        private readonly IMapper _mapper;
        public TaskService(IRepository<Tasks> taskRepo,IMapper mapper)
        {
            _taskRepo = taskRepo;
            _mapper = mapper;
        }

        public void Add(TaskRequestDto taskDto)
        {
            var tasks = _mapper.Map<Tasks>(taskDto);
            _taskRepo.Add(tasks);
        }

        public void Delete(Guid id)
        {
            var taskDetail = _taskRepo.GetById(id);
            if(taskDetail != null)
            {
                _taskRepo.Delete(taskDetail);
            }
        }

        public async Task<IEnumerable<TaskResponseDto>> GetAllTasks()
        {
            return  _mapper.Map<IEnumerable<TaskResponseDto>>(_taskRepo.GetAll());
        }

        public TaskResponseDto GetById(Guid id)
        {
            return _mapper.Map<TaskResponseDto>(_taskRepo.GetById(id));
        }

        public void Update(string id, TaskRequestDto taskDto)
        {
            //var taskDetail = _taskRepo.GetById(task.Id);
            //if(taskDetail != null)
            //{
                var task = _mapper.Map<Tasks>(taskDto);
                _taskRepo.Update(task);
            //}
        }
    }
}
