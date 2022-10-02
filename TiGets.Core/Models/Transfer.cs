using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tigets.Core.Models
{
	public class Transfer
	{
        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        public string TicketId { get; set; }

        [Required]
        public string FromId { get; set; }

        [Required]
        public string ToId { get; set; }

        [Required]
        public DateTime Time { get; set; }

		[Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Cost { get; set; }
    }
}