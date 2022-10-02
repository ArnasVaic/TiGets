using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;
using Tigets.Core.Repositories;

namespace Tigets.Core.Services
{
    public class TransferService : ITransferService
    {
        private readonly ITransferRepository _transferRepository;

        public TransferService(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        public async Task CreateTransfer(string buyerId, Ticket ticket)
        {
            if (buyerId == ticket.UserId)
                throw new Exception("Cannot transfer tickets to yourself");

            var transfer = new Transfer
            {
                Id = Guid.NewGuid().ToString(),
                Time = DateTime.UtcNow,
                TicketId = ticket.Id,
                ToId = buyerId,
                FromId = ticket.UserId,
                Cost = ticket.Cost
            };

            await _transferRepository.AddAsync(transfer);
            await _transferRepository.SaveChangesAsync();
        }
    }
}