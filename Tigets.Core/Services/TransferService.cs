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

        public async Task Create(string buyerId, string? ownerId, string ticketId, decimal cost)
        {
            var transfer = new Transfer
            {
                Id = Guid.NewGuid().ToString(),
                Time = DateTime.UtcNow,
                TicketId = ticketId,
                ToId = buyerId,
                FromId = ownerId,
                Cost = cost
            };

            await _transferRepository.AddAsync(transfer);
            await _transferRepository.SaveChangesAsync();
        }
    }
}