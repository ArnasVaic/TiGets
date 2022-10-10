using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Tigets.Core.Models;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace Tigets.Tests.AccountService
{
    public class AccountServiceTests
    {
        private readonly Mock<IUserStore<User>> _userStoreMock;
        private readonly Mock<IHttpContextAccessor> _contextAccessorMock;
        private readonly Mock<IUserClaimsPrincipalFactory<User>> _userClaimsPrincipalFactoryMock;
        private readonly Mock<IOptions<IdentityOptions>> _optionsMock;
        private readonly Mock<IAuthenticationSchemeProvider> _authenticationSchemeProviderMock;
        private readonly IMapper _mapper;

        public AccountServiceTests()
        {
            _userStoreMock = new Mock<IUserStore<User>>();
            _contextAccessorMock = new Mock<IHttpContextAccessor>();
            _optionsMock = new Mock<IOptions<IdentityOptions>>();
            _authenticationSchemeProviderMock = new Mock<IAuthenticationSchemeProvider>();
            _userClaimsPrincipalFactoryMock = new Mock<IUserClaimsPrincipalFactory<User>>();
            _mapper = TestsHelper.CreateDefaultMapper();
        }

        [Fact]
        public async Task AddBalance_UsernameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string username = null;
            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.AddBalance(username, 0);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(username)}')", result.Message);
        }

        [Fact]
        public async Task AddBalance_UserDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var userName = "username";
            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.AddBalance(userName, 10);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User does not exist.", result.Message);
        }

        [Fact]
        public async Task AddBalance_UserExists_UserManagerInvoked()
        {
            // ARRANGE
            var userName = "username";
            var user = new User { Balance = 20 };

            _userStoreMock.Setup(x => x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            var service = CreateAccountService();

            // ACT
            await service.AddBalance(userName, 10);

            // ASSERT
            _userStoreMock.Verify(x => x.UpdateAsync(It.IsAny<User>(), It.IsAny<CancellationToken>()), Times.Once);
            Assert.Equal(30, user.Balance);
        }

        [Fact]
        public async Task Login_UsernameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string username = null;
            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.Login(username, "password");

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(username)}')", result.Message);
        }

        [Fact]
        public async Task Login_PasswordNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string password = null;
            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.Login("username", password);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(password)}')", result.Message);
        }

        [Fact]
        public async Task Login_UserDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var userName = "username";
            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.Login(userName, "");

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User does not exist.", result.Message);
        }

        [Fact]
        public async Task Login_WrongPassword_ThrowsException()
        {
            // ARRANGE
            /*var userName = "username1";
            var password = "User123!";
            var user = new User { UserName = userName, PasswordHash = password};

            _userStoreMock.Setup(x => x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
             .ReturnsAsync(user);

            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.Login(userName, "User1234!");

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Incorrect password.", result.Message);*/
        }


        [Fact]
        public async Task Register_UserPostModelIsNull_ThrowsArgumentNullException()
        {
            UserPostModel userPostModel = null;
            // ARRANGE
            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.Register(userPostModel);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(userPostModel)}')", result.Message);
        }

        [Fact]
        public async Task Register_UserExists_ThrowsException()
        {
            var userName = "username";
            var user = new User { UserName = userName };

            _userStoreMock.Setup(x => x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            var service = CreateAccountService();

            // ACT
            Func<Task> action = async () => await service.Register(new UserPostModel {UserName = userName});

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User with this username already exists.", result.Message);
        }

        [Fact]
        public async Task Register_UserDoesNotExist_UserManagerInvoked()
        {
            var userName = "username";
            var password = "user123!";
            User user = null;
 
            UserPostModel userPostModel = new UserPostModel { 
                UserName = userName,
                Email = "mail@mail.com",
                PhoneNumber = "+37061111111",
                Name = "Username",
                Surname = "Username"
            };

            _userStoreMock.Setup(x => x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            var service = CreateAccountService();

            // ACT
            await service.Register(userPostModel);

            // ASSERT
          
        }

        private Core.Services.AccountService CreateAccountService()
        {
            var userManager =
                new UserManager<User>(_userStoreMock.Object, null, null, null, null, null, null, null, null);

            var signInManager = new SignInManager<User>(
                userManager,
                _contextAccessorMock.Object,
                _userClaimsPrincipalFactoryMock.Object,
                _optionsMock.Object,
                null,
                _authenticationSchemeProviderMock.Object,
                null
            );

            return new (signInManager, userManager, _mapper);
        }
    }
}