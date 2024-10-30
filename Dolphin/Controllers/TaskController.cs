using Dolphin.BLL.Services.IServices;
using Dolphin.DAL.Model;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService; 
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        { 
            var result = await _taskService.GetAllTasks();
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _taskRepository.GetAllTasks();
            if(list== null)
            {
                return NotFound();
            }
            return Ok(list);
        }


        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(Guid Id)
        {
            var result = _taskService.GetById(Id);
            return Ok(result);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Tasks tasks)
        {
            _taskService.Add(tasks);
            return Created();
        }
        [HttpPut]
        public async Task<IActionResult> Edit(Tasks tasks)
        {
            _taskService.Update(tasks);
            return Created();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            _taskService.Delete(id);
            return Ok();
        }
    }
}
