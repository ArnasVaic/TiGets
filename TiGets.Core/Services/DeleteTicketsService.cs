using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Core.Specifications;

namespace Tigets.Core.Services
{
    public class DeleteTicketsService : IDeleteTicketsService

    {
        private readonly ITicketRepository _ticketRepository;
        private readonly TicketService _ticketService;
        public DeleteTicketsService(ITicketRepository ticketRepository)
        {
           // _ticketService = ts;
            _ticketService.DeleteExpired += DeleteTickets;
            _ticketRepository = ticketRepository;
        }

        public async Task DeleteTickets(object sender, DeleteExpiredEventArgs e)
        {
            await _ticketRepository.DeleteBySpecUnsaved(new ExpiredTicketSpec(e.Id));
        }

    }
}
