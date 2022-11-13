using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;
using System.Data.Common;

namespace Tigets.Core.Utilities
{
    public class DbContextLoggingInterceptor : DbCommandInterceptor
    {
        private readonly ILogger<DbContextLoggingInterceptor> _logger;

        public DbContextLoggingInterceptor(ILogger<DbContextLoggingInterceptor> logger)
        {
            _logger = logger;
        }

        public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result,
            CancellationToken cancellationToken = new CancellationToken())
        {
            _logger.LogWarning($"{command.CommandText}");
            return ValueTask.FromResult(result);
        }

        public override DbDataReader ReaderExecuted(DbCommand command, CommandExecutedEventData eventData, DbDataReader result)
        {
            _logger.LogWarning($"{command.CommandText}");
            return result;
        }
    }
}