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
        Task Buy(string buyerId, string ticketId);
    }
}
