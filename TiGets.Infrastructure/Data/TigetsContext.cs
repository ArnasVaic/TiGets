using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Web.Models;

namespace Infrastructure.Data
{
    public class TigetsContext : DbContext
    {
        public TigetsContext(DbContextOptions<TigetsContext> options)
            : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }
    }
}