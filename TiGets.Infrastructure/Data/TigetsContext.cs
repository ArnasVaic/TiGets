using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Tigets.Core.Models;

namespace Tigets.Infrastructure.Data
{
    public class TigetsContext : IdentityDbContext
    {
        public TigetsContext(DbContextOptions<TigetsContext> options) 
            : base(options) { }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
    }
}