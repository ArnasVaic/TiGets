using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Ardalis.Specification;
using Tigets.Core.Models;

namespace Tigets.Core.Repositories
{
    public interface ITigetsRepository<T> : IRepositoryBase<T> where T : class
    {
        Task<T> GetByIdAsync(params object[] keyValues);

        Task AddRangeAsync(IEnumerable<T> items);

        Task AddRangeUnsavedAsync(IEnumerable<T> items);

        Task<bool> Any(ISpecification<T> specs);

        Task<bool> Any(ISpecification<T> specs, Expression<Func<T, bool>> predicate);

        Task<bool> All(ISpecification<T> specs, Expression<Func<T, bool>> predicate);

        Task AddUnsavedAsync(T item);

        Task DeleteUnsaved(T entity);

        Task DeleteRangeUnsaved(IEnumerable<T> entities);

        Task DeleteBySpecUnsaved(ISpecification<T> specification);
    }
}