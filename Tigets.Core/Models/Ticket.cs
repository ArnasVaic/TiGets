using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tigets.Core.Models
{
    public class Ticket : IEquatable<Ticket> 
    {
        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public TicketState State { get; set; }

        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidTo { get; set; }

        [Required]
        public string EventName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Cost { get; set; }

        public bool Equals(Ticket? other)
        {
            if (other is null) return false;
            return (Id == other.Id &&
                    UserId == other.UserId &&
                    State == other.State &&
                    ValidFrom == other.ValidFrom &&
                    ValidTo == other.ValidTo &&
                    EventName == other.EventName &&
                    Address == other.Address &&
                    Cost == other.Cost
                );
        }
    }
}