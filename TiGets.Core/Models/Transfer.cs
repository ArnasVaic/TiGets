namespace Tigets.Core.Models
{
	public class Transfer
	{
		public string Id { get; set; }

		public string TicketId { get; set; }

		public string FromId { get; set; }

		public string ToId { get; set; }

		public DateTime Time { get; set; }

		public decimal Cost { get; set; }
    }
}