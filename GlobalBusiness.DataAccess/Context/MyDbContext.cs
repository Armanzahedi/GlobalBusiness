using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Text;
using GlobalBusiness.Core.Entities;
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
        public DbSet<Log> Logs { get; set; }
        public DbSet<NavigationMenu> NavigationMenu { get; set; }
        public DbSet<RoleMenuPermission> RoleMenuPermission { get; set; }
        public DbSet<ReferralLink> ReferralLinks { get; set; }
        public DbSet<ReferralTree> ReferralTree { get; set; }
        public DbSet<UserPackage> UserPackages { get; set; }
        public DbSet<Package> Packages { get; set; }
                

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoleMenuPermission>()
            .HasKey(c => new { c.RoleId, c.NavigationMenuId });

            modelBuilder.Entity<ReferralTree>()
                .HasOne(n => n.ParentNode)
                .WithMany(m => m.ReferralTreeAsParent)
                .HasForeignKey(n => n.ParentNodeId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<ReferralTree>()
                .HasOne(n => n.ChildNode)
                .WithMany(m => m.ReferralTreeAsChild)
                .HasForeignKey(n => n.ChildNodeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserPackage>()
                .HasKey(c => new { c.UserId, c.PackageId });
            modelBuilder.Seed();
            base.OnModelCreating(modelBuilder);
        }
    }
}
