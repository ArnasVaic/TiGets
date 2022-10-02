using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tigets.Core.Models;

namespace Tigets.Core.Services
{
    public interface ITransferService
    {
        Task CreateTransfer(string buyerId, Ticket ticket);
    }
}