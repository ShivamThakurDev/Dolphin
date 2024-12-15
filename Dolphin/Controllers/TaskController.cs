using Dolphin.BLL.Services.IServices;
using Dolphin.DAL.DTOs;
using Dolphin.DAL.Model;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetAll()
        {
            var tasks = await _taskService.GetAllTasks();
            return Ok(tasks);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var result = _taskService.GetById(id);
            return Ok(result);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(TaskRequestDto taskDto)
        {
            _taskService.Add(taskDto);
            return Created();
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(string id, TaskRequestDto taskDto)
        {
            _taskService.Update(id,taskDto);
            return Created();
        }
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            _taskService.Delete(id);
            return Ok();
        }
    }
}
