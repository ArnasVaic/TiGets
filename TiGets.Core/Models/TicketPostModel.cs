namespace Tigets.Core.Models
{
    public class TicketPostModel
    {
        public TicketState state { get; set; }

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public string EventName { get; set; }

        public string Address { get; set; }

        public decimal Cost { get; set; }
    }
}
