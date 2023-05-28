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
    public class EventRepository : TigetsRepository<Event>, IEventRepository
    {
        public EventRepository(TigetsContext context) : base(context)
        { }
    }
}
