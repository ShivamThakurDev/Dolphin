using Dolphin.DAL.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        [HttpGet("GetAll")]
        public IActionResult GetRoles()
        {
            var roles = _roleManager.Roles.ToList();
            var roleList = roles.Select(role => new
            {
                role.Id,
                role.Name
            });

            return Ok(roleList);
        }


        [HttpPut("Edit/{id}")]
        public async Task<ActionResult> PutRoleAsync(string id, RoleDto model)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
                return NotFound();

            role.Name = model.Name;
            var result = await _roleManager.UpdateAsync(role);

            if (result.Succeeded)
            {
                return Ok(role);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("Add")]
        public async Task<ActionResult> PostRoleAsync(RoleDto model)
        {
            try
            {
                var role = new IdentityRole { Name = model.Name };
                var result = await _roleManager.CreateAsync(role);

                if (result.Succeeded)
                {
                    return Ok(role);
                }

                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteRoleAsync(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
                return NotFound();

            var result = await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }
    }
}
