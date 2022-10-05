using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Core.Services;

using Xunit;

namespace Tigets.Tests.TicketService
{
    public class TicketServiceTests
    {
        private readonly Mock<IUserStore<User>> _userStoreMock;
        private readonly Mock<ITicketRepository> _ticketRepositoryMock;
        private readonly Mock<ITransferService> _transferServiceMock;
        private readonly IMapper _mapper;

        public TicketServiceTests()
        {
            _ticketRepositoryMock = new Mock<ITicketRepository>();
            _transferServiceMock = new Mock<ITransferService>();
            _userStoreMock = new Mock<IUserStore<User>>();
            _mapper = TestsHelper.CreateDefaultMapper();
        }

        [Fact]
        public async Task Import_UsernameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            var model = new TicketPostModel();
            string username = null;
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Import(username, model);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(username)}')", result.Message);
        }

        [Fact]
        public async Task Import_TicketNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            TicketPostModel ticketPostModel = null;
            var username = "username";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Import(username, ticketPostModel);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(ticketPostModel)}')", result.Message);
        }

        [Fact]
        public async Task Import_InvalidTimeInterval_ThrowsException()
        {
            // ARRANGE
            var ticketPostModel = new TicketPostModel
            {
                ValidFrom = DateTime.Today.AddDays(10),
                ValidTo = DateTime.Today.AddDays(5),
            };
            var username = "username";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Import(username, ticketPostModel);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Ticket time interval is not valid.", result.Message);
        }

        [Fact]
        public async Task Import_ExpiredTicket_ThrowsException()
        {
            // ARRANGE
            var ticketPostModel = new TicketPostModel
            {
                ValidFrom = DateTime.Today.AddDays(-10),
                ValidTo = DateTime.Today.AddDays(-5),
            };
            var username = "username";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Import(username, ticketPostModel);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Ticket has expired.", result.Message);
        }

        [Fact]
        public async Task Import_NegativeCost_ThrowsException()
        {
            // ARRANGE
            var ticketPostModel = new TicketPostModel
            {
                ValidFrom = DateTime.Today.AddDays(1),
                ValidTo = DateTime.Today.AddDays(2),
                Cost = -10
            };
            var username = "username";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Import(username, ticketPostModel);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Ticket cost must be positive.", result.Message);
        }

        [Fact]
        public async Task Import_UserDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var ticketPostModel = new TicketPostModel
            {
                ValidFrom = DateTime.Today.AddDays(1),
                ValidTo = DateTime.Today.AddDays(2),
                Cost = 10
            };

            var username = "username";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Import(username, ticketPostModel);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal($"Cannot find user {username}", result.Message);
        }

        [Fact]
        public async Task Import_ValidRequest_DependenciesInvoked()
        {
            // ARRANGE
            var ticketPostModel = new TicketPostModel
            {
                ValidFrom = DateTime.Today.AddDays(1),
                ValidTo = DateTime.Today.AddDays(2),
                Cost = 10
            };

            var username = "username";

            _userStoreMock.Setup(x => 
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User {Id = "userid"});

            var service = CreateTicketService();

            // ACT
            await service.Import(username, ticketPostModel);

            // ASSERT
            _transferServiceMock.Verify(x => 
                x.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<decimal>()), Times.Once);

            _ticketRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Ticket>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        private Core.Services.TicketService CreateTicketService() => new (
            _ticketRepositoryMock.Object,
            _transferServiceMock.Object,
            new UserManager<User>(_userStoreMock.Object, null, null, null, null, null, null, null, null),
            _mapper
        );
    }
}