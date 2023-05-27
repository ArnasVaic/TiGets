using Microsoft.AspNetCore.Identity;
 
namespace Tigets.Core.Models
{
    public class User : IdentityUser
    {
        public decimal Balance { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

       
    }
}