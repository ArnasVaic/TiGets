using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;
using Tigets.Core.Repositories;

namespace Tigets.Core.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly ITransferService _transferService;
        private readonly UserManager<User> _userManager;

        public TicketService(
            ITicketRepository ticketRepository,
            ITransferService transferService,
            UserManager<User> userManager
        )
        {
            _ticketRepository = ticketRepository;
            _transferService = transferService;
            _userManager = userManager;
        }

        public async Task Buy(string username, string ticketId)
        {
            var user = await _userManager.FindByNameAsync(username);
            var ticket = await _ticketRepository.GetByIdAsync(ticketId) ?? throw new Exception("Ticket does not exist");
            var owner = await _userManager.FindByIdAsync(ticketId) ?? throw new Exception("Owner does not exist");

            if (owner.Id == user.Id)
                throw new Exception("User cannot buy a ticket that already belongs to him");

            if (user.Balance < ticket.Cost)
                throw new Exception("User does not have enough money to buy this ticket");

            await _transferService.CreateTransfer(user.Id, ticket);

            ticket.UserId = user.Id;
            user.Balance -= ticket.Cost;
            owner.Balance += ticket.Cost;
        }
    }
}
