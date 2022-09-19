using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.Specification;
using Tigets.Core.Models;

namespace Tigets.Core.Specifications
{
    public class UserByNameAndPasswordHashSpecification : Specification<User>
    {
        public UserByNameAndPasswordHashSpecification(string username, string passwordHash)
        {
            Query.Where(x => x.Username == username && x.PasswordHash == passwordHash);
        }
    }
}
