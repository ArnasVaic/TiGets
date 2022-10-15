using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Core.Services;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Tigets.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [Authorize]
        [HttpPatch("Balance")]
        public async Task<IActionResult> AddBalance(decimal amount)
        {
            var username = User.Identity?.Name;
            try
            {
                await _accountService.AddBalance(username, amount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromQuery] string username, [FromHeader(Name = "password")] string password)
        {
            if (User.Identity.IsAuthenticated)
            {
                return BadRequest("User is already logged in");
            }
            try
            {
                await _accountService.Login(username, password);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserPostModel userPostModel)
        {
            try
            {
                await _accountService.Register(userPostModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [Authorize]
        [HttpGet("GetProfileData")]
        public async Task<IActionResult> GetProfileData()
        {
            return Ok(new UserViewModel());
        }
    }
}
