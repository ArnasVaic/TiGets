using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Xunit;

namespace Tigets.Tests.TransferService
{
    public class TransferServiceTests
    {
        private readonly Mock<ITransferRepository> _transferRepositoryMock;

        public TransferServiceTests()
        {
            _transferRepositoryMock = new Mock<ITransferRepository>();
        }

        [Fact]
        public async Task Create_BuyerIdNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string buyerId = null;
            var service = CreateTransferService();

            // ACT
            Func<Task> action = async () => await service.Create(buyerId, "ownerId", "ticketId", 10);

            // ASSERT
            _transferRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Transfer>(), It.IsAny<CancellationToken>()), Times.Never);

            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(buyerId)}')", result.Message);
        }

        [Fact]
        public async Task Create_OwnerIdNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string ownerId = null;
            var service = CreateTransferService();

            // ACT
            Func<Task> action = async () => await service.Create("buyerId", ownerId, "ticketId", 10);

            // ASSERT
            _transferRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Transfer>(), It.IsAny<CancellationToken>()), Times.Never);

            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(ownerId)}')", result.Message);
        }

        [Fact]
        public async Task Create_TicketIdNull_ThrowsArgumentNullException()
        {
            // ARRANGE
            string ticketId = null;
            var service = CreateTransferService();

            // ACT
            Func<Task> action = async () => await service.Create("buyerId", "ownerId", ticketId, 10);

            // ASSERT
            _transferRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Transfer>(), It.IsAny<CancellationToken>()), Times.Never);

            var result = await Assert.ThrowsAsync<ArgumentNullException>(action);
            Assert.Equal($"Value cannot be null. (Parameter '{nameof(ticketId)}')", result.Message);
        }

        [Fact]
        public async Task Create_NegativeCost_ThrowsException()
        {
            // ARRANGE
            decimal cost = -1;
            var service = CreateTransferService();

            // ACT
            Func<Task> action = async () => await service.Create("buyerId", "ownerId", "ticketId", cost);

            // ASSERT
            _transferRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Transfer>(), It.IsAny<CancellationToken>()), Times.Never);

            var result = await Assert.ThrowsAsync<Exception>(action);
            Assert.Equal("Cannot register a transfer with a negative cost.", result.Message);
        }

        [Fact]
        public async Task Create_PassingTests_TransferRepositoryInvoked()
        {
            // ARRANGE
            var service = CreateTransferService();

            // ACT
            await service.Create("buyerId", "ownerId", "ticketId", 10);

            // ASSERT
            _transferRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Transfer>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        private Core.Services.TransferService CreateTransferService() 
            => new (_transferRepositoryMock.Object);
    }
}