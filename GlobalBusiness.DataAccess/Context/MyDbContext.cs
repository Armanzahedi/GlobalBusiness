using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Text;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Seed;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GlobalBusiness.DataAccess.Context
{
    public class MyDbContext : IdentityDbContext<User>
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        public DbSet<SystemParameter> SystemParameters { get; set; }
        public DbSet<NavigationMenu> NavigationMenu { get; set; }
        public DbSet<RoleMenuPermission> RoleMenuPermission { get; set; }
                

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoleMenuPermission>()
            .HasKey(c => new { c.RoleId, c.NavigationMenuId });

            modelBuilder.Seed();
            base.OnModelCreating(modelBuilder);
        }
    }
}
