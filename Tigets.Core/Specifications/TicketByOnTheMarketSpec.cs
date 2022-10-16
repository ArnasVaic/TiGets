using Ardalis.Specification;
using Tigets.Core.Models;

namespace Tigets.Core.Specifications
{
    public class TicketByOnTheMarketSpec : Specification<Ticket>
    {
        public TicketByOnTheMarketSpec(string userId)
        {
            Query.Where(x => (x.State == TicketState.OnMarket && x.UserId != userId));
        }
    }
}