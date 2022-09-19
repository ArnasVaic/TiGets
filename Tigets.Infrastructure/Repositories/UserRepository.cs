using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.Specification;
using Tigets.Core.Models;
using Tigets.Infrastructure.Data;

namespace Tigets.Core.Repositories
{
    public class UserRepository : TigetsRepository<User>, IUserRepository
    {
        public UserRepository(TigetsContext dbContext) 
            : base(dbContext)
        {
        }

        public UserRepository(TigetsContext dbContext, ISpecificationEvaluator specificationEvaluator) 
            : base(dbContext, specificationEvaluator)
        {
        }
    }
}
