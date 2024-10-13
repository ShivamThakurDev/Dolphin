using Dolphin.BLL.Repository.IRepository;
using Dolphin.BLL.Services.IServices;
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
        public TaskService(IRepository<Tasks> taskRepo)
        {
            _taskRepo = taskRepo;
        }

        public void Add(Tasks task)
        {
           _taskRepo.Add(task);
        }

        public void Delete(Guid id)
        {
            var taskDetail = _taskRepo.GetById(id);
            if(taskDetail != null)
            {
                _taskRepo.Delete(taskDetail);
            }
        }

        public async Task<IEnumerable<Tasks>> GetAllTasks()
        {
            return  _taskRepo.GetAll();
        }

        public Tasks GetById(Guid id)
        {
            return _taskRepo.GetById(id);
        }

        public void Update(Tasks task)
        {
            var taskDetail = _taskRepo.GetById(task.Id);
            if(taskDetail != null)
            {
                
                _taskRepo.Update(task);
            }
        }
    }
}
