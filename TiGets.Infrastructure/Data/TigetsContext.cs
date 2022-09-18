using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Tigets.Core.Models;

namespace Tigets.Infrastructure.Data
{
    public class TigetsContext : DbContext
    {
        public TigetsContext(DbContextOptions<TigetsContext> options) 
            : base(options) { }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
    }
}