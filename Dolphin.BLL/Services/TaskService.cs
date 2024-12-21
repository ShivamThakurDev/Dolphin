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
    public class TaskService : ITaskService
    {
        private readonly IRepository<Tasks> _taskRepo;
        private readonly IMapper _mapper;
        public TaskService(IRepository<Tasks> taskRepo, IMapper mapper)
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
            return _mapper.Map<IEnumerable<TaskResponseDto>>(_taskRepo.GetAll().Where(x => !x.IsDeleted));
        }

        public TaskResponseDto GetById(string id)
        {
            try
            {
                if (Guid.TryParse(id, out var taskId))
                {
                    return _mapper.Map<TaskResponseDto>(_taskRepo.GetById(taskId));
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new Exception("Message expection details", ex);
            }

        }

        public void Update(string id, TaskRequestDto taskDto)
        {
            if (Guid.TryParse(id, out var guidId))
            {
                var taskDetail = _taskRepo.GetById(guidId);
                if (taskDetail != null)
                {
                    taskDetail.Name = taskDto.Name;
                    taskDetail.Description = taskDto.Description;
                    taskDetail.Status = taskDto.Status;
                    taskDetail.Priority = taskDto.Priority;
                    taskDetail.Progress = taskDto.Progress;
                    taskDetail.StoryPoint = taskDto.StoryPoint;
                    taskDetail.StartDate = taskDto.StartDate;
                    taskDetail.EndDate = taskDto.EndDate;
                    _taskRepo.Update(taskDetail);
                }
            }
        }
    }
}