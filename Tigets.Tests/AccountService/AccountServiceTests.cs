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

namespace Tigets.Tests.AccountService
{
    public class AccountServiceTests
    {
        //private readonly Mock<SignInManager<User>> _signInManagerMock;
        private readonly Mock<IUserStore<User>> _userStoreMock;
        private readonly IMapper _mapper;

        // sign in mocks
        private readonly Mock<IHttpContextAccessor> _contextAccessorMock;
        private readonly Mock<IUserClaimsPrincipalFactory<User>> _userClaimsPrincipalFactoryMock;
        private readonly Mock<IOptions<IdentityOptions>> _optionsMock;
        private readonly Mock<IAuthenticationSchemeProvider> _authenticationSchemeProviderMock;

        public AccountServiceTests()
        {
            //_signInManagerMock = new Mock<SignInManager<User>>();
            _userStoreMock = new Mock<IUserStore<User>>();
            _mapper = TestsHelper.CreateDefaultMapper();

            _contextAccessorMock = new Mock<IHttpContextAccessor>();
            _optionsMock = new Mock<IOptions<IdentityOptions>>();
            _authenticationSchemeProviderMock = new Mock<IAuthenticationSchemeProvider>();
            _userClaimsPrincipalFactoryMock = new Mock<IUserClaimsPrincipalFactory<User>>();
        }

        [Fact]
        public async Task AddBalance_UsernameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string userName = null;
            var service = CreateAccountService();
            // ACT
            Func<Task> action = async () => await service.AddBalance(userName, 0);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(userName)}')", result.Message);
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
