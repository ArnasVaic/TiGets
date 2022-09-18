using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tigets.Core.Models
{
    public class User
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public double Balanace { get; set; }
        public string Username { get; set; }
        public double PasswordHash { get; set; }
    }
}