using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;

namespace Tigets.Core.Specifications
{
    public class TicketByOnTheMarketSpec : Specification<Ticket>
    {
        public TicketByOnTheMarketSpec(string userId)
        {
            Query.Where(c => (c.State == TicketState.OnMarket && userId != c.UserId));
        }
    }
}
