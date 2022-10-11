using Ardalis.Specification;
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