using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Tigets.Infrastructure.Data;

namespace Tigets.Core.Repositories
{
    public class TigetsRepository<T> : RepositoryBase<T>, ITigetsRepository<T> where T : class
    {
        protected readonly TigetsContext _dbContext;

        public TigetsRepository(TigetsContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public TigetsRepository(TigetsContext dbContext, ISpecificationEvaluator specificationEvaluator) : base(dbContext, specificationEvaluator)
        {
            _dbContext = dbContext;
        }

        public async Task<T> GetByIdAsync(params object[] keyValues)
        {
            return await _dbContext.Set<T>().FindAsync(keyValues);
        }

        public Task AddRangeAsync(IEnumerable<T> items)
        {
            _dbContext.Set<T>().AddRange(items);
            return SaveChangesAsync();
        }

        public Task AddRangeUnsavedAsync(IEnumerable<T> items)
        {
            _dbContext.Set<T>().AddRange(items);
            return Task.CompletedTask;
        }

        public async Task<bool> Any(ISpecification<T> specs)
        {
            return await ApplySpecification(specs).AnyAsync();
        }

        public async Task<bool> Any(ISpecification<T> specs, Expression<Func<T, bool>> predicate)
        {
            return await ApplySpecification(specs).AnyAsync(predicate);
        }

        public async Task<bool> All(ISpecification<T> specs, Expression<Func<T, bool>> predicate)
        {
            return await ApplySpecification(specs).AllAsync(predicate);
        }

        public async Task AddUnsavedAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
        }

        public Task DeleteUnsaved(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            return Task.CompletedTask;
        }

        public Task DeleteRangeUnsaved(IEnumerable<T> entities)
        {
            _dbContext.Set<T>().RemoveRange(entities);
            return Task.CompletedTask;
        }

        public async Task DeleteBySpecUnsaved(ISpecification<T> specification)
        {
            _dbContext.RemoveRange(await ListAsync(specification));
        }

        public Task<IQueryable<TModel>> GetQueryableSet<TModel>() where TModel : class
        {
            return Task.FromResult(_dbContext.Set<TModel>().AsQueryable());
        }
    }
}
