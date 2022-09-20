using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Repositories;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public AccountController()
        {

        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromQuery] string username, [FromQuery] string passwordHash)
        {
            return Ok();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromQuery] string username, [FromQuery] string passwordHash)
        {
            return Ok();
        }
    }
}
