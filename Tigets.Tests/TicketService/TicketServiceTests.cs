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
                .ReturnsAsync(new User { Id = "userid" });

            var service = CreateTicketService();

            // ACT
            await service.Import(username, ticketPostModel);

            // ASSERT
            _transferServiceMock.Verify(x =>
                x.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<decimal>()), Times.Once);

            _ticketRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Ticket>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task Buy_UsernameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string username = null;
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, "ticketId");

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(username)}')", result.Message);
        }

        [Fact]
        public async Task Buy_TicketIdNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string ticketId = null;
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy("username", ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(ticketId)}')", result.Message);
        }

        [Fact]
        public async Task Buy_TicketDoesNotExists_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var ticketId = "ticketId";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Ticket does not exist.", result.Message);
        }

        [Fact]
        public async Task Buy_TicketIsOffMarket_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var ticketId = "ticketId";

            var ticket = new Ticket { State = TicketState.OffMarket };

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User cannot buy a ticket that is off the market.", result.Message);
        }

        [Fact]
        public async Task Buy_EventAlreadyStarted_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var ticketId = "ticketId";

            var ticket = new Ticket
            {
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(-1)
            };

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("This event has already ended.", result.Message);
        }

        [Fact]
        public async Task Buy_OwnerDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var ticketId = "ticketId";

            var ticket = new Ticket
            {
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1)
            };

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Owner does not exist.", result.Message);
        }

        [Fact]
        public async Task Buy_UserDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var ticketId = "ticketId";
            var ownerId = "ownerId";

            var ticket = new Ticket
            {
                UserId = ownerId,
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1)
            };

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            _userStoreMock.Setup(x =>
                    x.FindByIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User());

            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User does not exist.", result.Message);
        }

        [Fact]
        public async Task Buy_UserIdsMatch_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var ticketId = "ticketId";
            var ownerId = "ownerId";

            var ticket = new Ticket
            {
                UserId = ownerId,
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1)
            };

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            _userStoreMock.Setup(x =>
                    x.FindByIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User { Id = ownerId });

            _userStoreMock.Setup(x =>
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User { Id = ownerId });

            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User cannot buy a ticket that already belongs to him.", result.Message);
        }

        [Fact]
        public async Task Buy_NotEnoughMoney_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var ticketId = "ticketId";
            var ownerId = "ownerId";
            var userId = "userId";

            var ticket = new Ticket
            {
                UserId = ownerId,
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1),
                Cost = 10
            };

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            _userStoreMock.Setup(x =>
                    x.FindByIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User { Id = ownerId });

            _userStoreMock.Setup(x =>
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User { Id = userId, Balance = 0 });

            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Buy(username, ticketId);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User does not have enough money to buy this ticket.", result.Message);
        }

        [Fact]
        public async Task Buy_PassingTest_TicketUserIdChangedMoneyMovedStateChangedTransferCreated()
        {
            // ARRANGE
            var owner = new User { Id = "ownerId", Balance = 0 };
            var user = new User { UserName = "username", Id = "userId", Balance = 10 };

            var ticket = new Ticket
            {
                Id = "ticketId",
                UserId = owner.Id,
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1),
                Cost = 10
            };

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            _userStoreMock.Setup(x =>
                    x.FindByIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(owner);

            _userStoreMock.Setup(x =>
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            var service = CreateTicketService();

            // ACT
            await service.Buy(user.UserName, ticket.Id);

            // ASSERT
            _transferServiceMock.Verify(x => x.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<decimal>()), Times.Once);

            Assert.Equal(user.Id, ticket.UserId);
            Assert.Equal(10, owner.Balance);
            Assert.Equal(0, user.Balance);
            Assert.Equal(TicketState.OffMarket, ticket.State);
        }

        [Fact]
        public async Task Move_UsernameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string username = null;
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Move(username, "ticketId", TicketState.OffMarket);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(username)}')", result.Message);
        }

        [Fact]
        public async Task Move_TicketIdNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string ticketId = null;
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Move("username", ticketId, TicketState.OffMarket);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(ticketId)}')", result.Message);
        }

        [Fact]
        public async Task Move_TicketDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.Move("username", "ticketId", TicketState.OffMarket);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Ticket does not exist.", result.Message);
        }

        [Fact]
        public async Task Move_UserDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var service = CreateTicketService();

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(new Ticket());

            // ACT
            Func<Task> action = async () => await service.Move("username", "ticketId", TicketState.OffMarket);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User does not exist.", result.Message);
        }

        [Fact]
        public async Task Move_UserIdsDoNotMatch_ThrowsException()
        {
            // ARRANGE
            var service = CreateTicketService();

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(new Ticket { UserId = "userId1" });

            _userStoreMock.Setup(x =>
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User { Id = "userId2" });

            // ACT
            Func<Task> action = async () => await service.Move("username", "ticketId", TicketState.OffMarket);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("User does not own this ticket.", result.Message);
        }

        [Theory]
        [InlineData(TicketState.OffMarket, TicketState.OnMarket)]
        [InlineData(TicketState.OnMarket, TicketState.OffMarket)]
        public async Task Move_StateChangedAndSaveChangesAsyncInvoked(TicketState currentState, TicketState newState)
        {
            // ARRANGE
            var id = "userId";
            var ticket = new Ticket { UserId = id, State = currentState };

            var service = CreateTicketService();

            _ticketRepositoryMock.Setup(x =>
                    x.GetByIdAsync(It.IsAny<string>()))
                .ReturnsAsync(ticket);

            _userStoreMock.Setup(x =>
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new User { Id = id });

            // ACT
            await service.Move("username", "ticketId", newState);

            // ASSERT
            _ticketRepositoryMock.Verify(x =>
                x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);

            Assert.Equal(newState, ticket.State);
        }

        private Core.Services.TicketService CreateTicketService() => new(
        [Fact]
        public async Task GetTicketsOnTheMarket_UserNameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string username = null;
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.GetTicketsOnTheMarket(username);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(username)}')", result.Message);
        }

        [Fact]
        public async Task GetTicketsOnTheMarket_UserDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.GetTicketsOnTheMarket(username);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal($"User does not exist.", result.Message);
        }

        [Fact]
        public async Task GetTicketsOnTheMarket_PassingTest_FiltersUserTicketsAndOnTheMarket()
        {
            // ARRANGE
            var user = new User { UserName = "username", Id = "userId" };

            var ticket1 = new Ticket
            {
                Id = "ticketId1",
                UserId = "randomId",
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1),
                Cost = 10
            };

            var ticket2 = new Ticket
            {
                Id = "ticketId2",
                UserId = user.Id,
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1),
                Cost = 10
            };

            var ticket3 = new Ticket
            {
                Id = "ticketId3",
                UserId = user.Id,
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1),
                Cost = 10
            };

            _userStoreMock.Setup(x =>
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            _ticketRepositoryMock.Setup(x => x.ListAsync(It.IsAny<TicketByOnTheMarketSpec>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<Ticket> { ticket1, ticket2, ticket3 });

            var service = CreateTicketService();

            // ACT
            var tickets = await service.GetTicketsOnTheMarket(user.UserName);

            // ASSERT
            Assert.Single(tickets);
            Assert.Equal(ticket1, tickets.FirstOrDefault());
        }

        [Fact]
        public async Task GetUserTickets_UserNameNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string username = null;
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.GetUserTickets(username);

            // ASSERT
            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(username)}')", result.Message);
        }

        [Fact]
        public async Task GetUserTickets_UserDoesNotExist_ThrowsException()
        {
            // ARRANGE
            var username = "username";
            var service = CreateTicketService();

            // ACT
            Func<Task> action = async () => await service.GetUserTickets(username);

            // ASSERT
            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal($"User does not exist.", result.Message);
        }

        [Fact]
        public async Task GetUserTickets_PassingTest_FiltersUserTickets()
        {
            // ARRANGE
            var user = new User { UserName = "username", Id = "userId", Balance = 10 };

            var ticket1 = new Ticket
            {
                Id = "ticketId1",
                UserId = user.Id,
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1),
                Cost = 10
            };

            var ticket2 = new Ticket
            {
                Id = "ticketId2",
                UserId = "userId2",
                State = TicketState.OnMarket,
                ValidTo = DateTime.Today.AddDays(1),
                Cost = 10
            };

            _userStoreMock.Setup(x =>
                    x.FindByNameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            _ticketRepositoryMock.Setup(x => x.ListAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<Ticket> { ticket1, ticket2 });

            var service = CreateTicketService();

            // ACT
            var tickets = await service.GetUserTickets(user.UserName);

            // ASSERT
            Assert.Single(tickets);
            Assert.Equal(ticket1, tickets.FirstOrDefault());
        }

        private Core.Services.TicketService CreateTicketService() => new(
            _ticketRepositoryMock.Object,
            _transferServiceMock.Object,
            new UserManager<User>(_userStoreMock.Object, null, null, null, null, null, null, null, null),
            _mapper
        );
    }
}