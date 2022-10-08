using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public interface ITicketService
    {
        Task Import(string username, TicketPostModel ticketPostModel);
        Task Buy(string buyerId, string ticketId);
        Task<List<Ticket>> GetTicketsOnTheMarket(string UserId);
    }
}
