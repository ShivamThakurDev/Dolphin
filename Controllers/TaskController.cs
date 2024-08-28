using Microsoft.AspNetCore.Mvc;

namespace Dolphin.Controllers
{
    public class TaskController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
