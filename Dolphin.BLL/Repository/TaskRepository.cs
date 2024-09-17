using Dolphin.BLL.Repository.IRepository;
using Dolphin.Common.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dolphin.BLL.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private IUnitOfWork<Tasks> _unitOfWork;
        public TaskRepository(IUnitOfWork<Tasks> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateTask(Tasks taskDetail)
        {
            if (taskDetail != null)
            {
                await _unitOfWork.Add(taskDetail);
                var result = _unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public async Task<bool> DeleteTask(Guid Id)
        {
            if (!string.IsNullOrEmpty(Id.ToString()))
            {
                var taskDetails = await _unitOfWork.GetById(Id);
                _unitOfWork.Delete(taskDetails);
                var result = _unitOfWork.Save();
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
        }

        public async Task<IEnumerable<Tasks>> GetAllTasks()
        {
            var taskList = await _unitOfWork.GetAll();
            return taskList;
        }

        public async Task<Tasks> GetTaskById(Guid Id)
        {
            if (string.IsNullOrEmpty(Id.ToString()))
            {
                var taskDetail = await _unitOfWork.GetById(Id);
                if (taskDetail != null)
                {
                    return taskDetail;
                }
            }
            return null;
        }

        public async Task<bool> UpdateTask(Tasks taskDetail)
        {
            if (taskDetail != null)
            {
                var task = await _unitOfWork.GetById(taskDetail.Id);
                if (task != null)
                {
                    _unitOfWork.Update(task);
                    if (_unitOfWork.Save()!=0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return false;
        }
    }
}
