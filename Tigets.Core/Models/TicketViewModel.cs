using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tigets.Core.Models
{
    public class TicketViewModel
    {
        public TicketState State { get; set; }

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public string EventName { get; set; }

        public string Address { get; set; }

        public decimal Cost { get; set; }
    }
}
