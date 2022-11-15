using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;

namespace Tigets.Core.Specifications
{
    public class ExpiredTicketSpec : Specification<Ticket>
    {
        public ExpiredTicketSpec(string userId)
        {
            Query.Where(x => (x.UserId == userId) && (x.ValidTo < DateTime.UtcNow));
        }
    }
}
