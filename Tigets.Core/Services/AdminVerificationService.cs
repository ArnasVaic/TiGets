using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;
using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public class AdminVerificationService : IAdminVerificationService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AdminVerificationService(
            SignInManager<User> signInManager,
            UserManager<User> userManager
        )
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public string GetAppInfo()
        {
            throw new NotImplementedException();
        }

        public async Task Login(string username, string password)
        {
            if (username is null)
                throw new ArgumentNullException($"{nameof(username)}");

            if (password is null)
                throw new ArgumentNullException($"{nameof(password)}");

            var admin = await _userManager.FindByNameAsync(username);

            if (admin is null)
                throw new Exception("Admin does not exist.");

            if (!await _userManager.CheckPasswordAsync(admin, password))
                throw new Exception("Incorrect password.");

            var result = await _signInManager.PasswordSignInAsync(admin, password, false, false);

            if (!result.Succeeded)
                throw new Exception(result.ToString());
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public Task VerifyUser(UserPostModel user)
        {
            throw new NotImplementedException();
        }
    }
}
