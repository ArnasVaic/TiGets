using Microsoft.AspNetCore.Mvc;
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

        public async Task Create(string buyerId, string ownerId, string ticketId, decimal cost)
        {
            if (buyerId is null)
                throw new ArgumentNullException($"{nameof(buyerId)}");

            if (ownerId is null)
                throw new ArgumentNullException($"{nameof(ownerId)}");

            if (ticketId is null)
                throw new ArgumentNullException($"{nameof(ticketId)}");

            if (cost <= 0)
                throw new Exception("Cannot register a transfer with a non positive cost.");

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
        }

        public async Task<IEnumerable<Transfer>> GetTransfers(string ticketId)
        {
            if (ticketId is null)
                throw new ArgumentNullException($"{nameof(ticketId)}");

            var transfers = from transfer in await _transferRepository.ListAsync()
                where transfer.TicketId == ticketId
                orderby transfer.Time
                select transfer;

            return transfers;
        }
    }
}