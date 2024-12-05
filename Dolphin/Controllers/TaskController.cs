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
        public async Task<IEnumerable<Tasks>> GetAll()
        { 
            return await _taskService.GetAllTasks();
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
