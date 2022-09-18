using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public AccountController() { }

        [HttpGet("login")]
        public async Task<string> Login([FromQuery] string returnUrl)
        {
            return "this is the login page";
        }

        [HttpPost("login")]
        public async Task<IActionResult> Validate(
            [FromQuery] string username, 
            [FromQuery] string password,
            [FromQuery] string returnUrl
        )
        {
            if (username == "admin" && password == "123")
            {
                var claims = new List<Claim>();
                claims.Add(new Claim("username", username));
                claims.Add(new Claim(ClaimTypes.NameIdentifier, username));
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                await HttpContext.SignInAsync(claimsPrincipal);
                return Redirect(returnUrl);
            }
            return BadRequest();
        }
    }
}
