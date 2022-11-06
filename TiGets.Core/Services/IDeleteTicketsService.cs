using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tigets.Core.Services
{
    public interface IDeleteTicketsService
    {
        public Task DeleteTickets(object sender, DeleteExpiredEventArgs e);
    }
}
