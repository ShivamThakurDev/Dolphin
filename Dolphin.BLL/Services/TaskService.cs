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

        public void Delete(string id)
        {
            try 
            {
                if (Guid.TryParse(id, out var taskId))
                {
                    Tasks taskDetail = _taskRepo.GetById(taskId);
                    if (taskDetail != null)
                    {
                        _taskRepo.Delete(taskDetail);
                    }
                }
                else
                {

                    throw new Exception("Invalid Guid Id");
                }
            }
            
            catch (Exception ex)
            {
                throw new Exception("Message expection details", ex);
            }
        }

        public async Task<IEnumerable<TaskResponseDto>> GetAllTasks()
        {
            return  _mapper.Map<IEnumerable<TaskResponseDto>>(_taskRepo.GetAll().Where(x=>!x.IsDeleted));
        }

        public TaskResponseDto GetById(string id)
        {
            try
            {
                if(Guid.TryParse(id,out  var taskId))
                {
                    return _mapper.Map<TaskResponseDto>(_taskRepo.GetById(taskId));
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new Exception("Message expection details",ex);
            }
            
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
