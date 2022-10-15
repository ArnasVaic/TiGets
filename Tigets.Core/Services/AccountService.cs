using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using AutoMapper;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Core.Specifications;

namespace Tigets.Core.Services
{
    public class AccountService : IAccountService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AccountService(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IMapper mapper
        )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task AddBalance(string username, decimal amount)
        {
            if(username is null)
                throw new ArgumentNullException($"{nameof(username)}");

            // TODO: perhaps it's not a good idea to allow adding negative amount of money
            var user = await _userManager.FindByNameAsync(username);
            if (user is null)
                throw new Exception("User does not exist.");

            user.Balance += amount;
            await _userManager.UpdateAsync(user);
        }

        public async Task Login(string username, string password)
        {
            if (username is null)
                throw new ArgumentNullException($"{nameof(username)}");

            if (password is null)
                throw new ArgumentNullException($"{nameof(password)}");

            var user = await _userManager.FindByNameAsync(username);

            if (user is null)
                throw new Exception("User does not exist.");

            if (!await _userManager.CheckPasswordAsync(user, password))
                throw new Exception("Incorrect password.");

            var result = await _signInManager.PasswordSignInAsync(user, password, false, false);

            if (!result.Succeeded)
                throw new Exception(result.ToString());
        }

        public async Task Register(UserPostModel userPostModel)
        {
            if (userPostModel is null)
                throw new ArgumentNullException($"{nameof(userPostModel)}");

            var user = await _userManager.FindByNameAsync(userPostModel.UserName);
            if (user != null)
                throw new Exception("User with this username already exists.");

            user = _mapper.Map<User>(userPostModel);
            user.Id = Guid.NewGuid().ToString();
            user.Balance = 0m;
            user.EmailConfirmed = true;
            var result = await _userManager.CreateAsync(user, userPostModel.Password);

            if (!result.Succeeded)
                throw new Exception(result.ToString());
        }

        public async Task<UserViewModel> GetProfileData(string username)
        {
            UserViewModel userView = new UserViewModel();
            var user = await _userManager.FindByNameAsync(username);

            userView.UserName = user.UserName;
            userView.Name = user.Name;
            userView.Surname = user.Surname;
            userView.Email = user.Email;
            userView.PhoneNumber = user.PhoneNumber;
            userView.Balance = user.Balance;

            return userView;
        }
    }
}
