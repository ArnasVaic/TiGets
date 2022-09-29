using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;
using Tigets.Core.Repositories;
using Tigets.Infrastructure.Data;

namespace Tigets.Infrastructure.Repositories
{
    public class TicketRepository : TigetsRepository<Ticket>, ITicketRepository
    {
        public TicketRepository(TigetsContext context) : base(context) 
            { }
    }
}
