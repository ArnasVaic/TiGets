﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tigets.Core.Models;
using Tigets.Core.Services;

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
            await _accountService.AddBalance(username, amount);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromQuery] string username, [FromHeader(Name = "password")] string password)
        {
            if (User.Identity.IsAuthenticated)
                return BadRequest("User is already logged in");
            await _accountService.Login(username, password);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserPostModel userPostModel)
        {
            await _accountService.Register(userPostModel);
            return NoContent();
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _accountService.Logout();
            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet("GetInfo")]
        public string GetAppInfo()
        {
            return _accountService.GetAppInfo();
        }

        [Authorize]
        [HttpGet("GetProfileData")]
        public async Task<IActionResult> GetProfileData()
        {
            var name = User.Identity?.Name ?? throw new Exception("User does not exist");
            var user = await _accountService.GetProfileData(username: name);
            return Ok(user);
        }
    }
}