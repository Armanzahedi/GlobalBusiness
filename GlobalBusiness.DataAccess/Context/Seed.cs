using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using GlobalBusiness.DataAccess.Repositories;
using GlobalBusiness.Utilities.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GlobalBusiness.DataAccess.Context
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            #region Seed Users

            var SUPER_USER_ID = "75625814-138e-4831-a1ea-bf58e211acmf";
            var ADMIN_ID = "75625814-138e-4831-a1ea-bf58e211adff";

            var admin = new User()
            {
                Id = ADMIN_ID,
                Avatar = "user-avatar.png",
                FirstName = "Admin",
                LastName = "Admin",
                UserName = "Admin",
                NormalizedUserName = "Admin".ToUpper(),
                Email = "Admin@Admin.com",
                NormalizedEmail = "Admin@Admin.com".ToUpper()
            };
            admin.PasswordHash = GetHashedPassword(admin, "Admin");

            var superuser = new User()
            {
                Id = SUPER_USER_ID,
                Avatar = "user-avatar.png",
                FirstName = "Superuser",
                LastName = "Superuser",
                UserName = "Superuser",
                NormalizedUserName = "Superuser".ToUpper(),
                Email = "Superuser@Superuser.com",
                NormalizedEmail = "Superuser@Superuser.com".ToUpper()
            };
            superuser.PasswordHash = GetHashedPassword(superuser, "Superuser");

            modelBuilder.Entity<User>().HasData(
                admin,
                superuser
            );
            #endregion
            #region Seed ReferralLinks
            var SUPER_USER_REFERRAL_LINK_LEFT = "23ad82tw";
            var SUPER_USER_REFERRAL_LINK_RIGHT = "65gh72tn";
            var ADMIN_REFERRAL_LINK_LEFT = "29bd76db";
            var ADMIN_REFERRAL_LINK_RIGHT = "91tm83ps";
            modelBuilder.Entity<ReferralLink>().HasData(
                new ReferralLink
                {
                    Id = 1,
                    UserId = SUPER_USER_ID,
                    Link = SUPER_USER_REFERRAL_LINK_LEFT,
                    ReferralType = ReferralType.LeftWing,
                    InsertDate = DateTime.Now
                },
                new ReferralLink
                {
                    Id = 2,
                    UserId = SUPER_USER_ID,
                    Link = SUPER_USER_REFERRAL_LINK_RIGHT,
                    ReferralType = ReferralType.RightWing,
                    InsertDate = DateTime.Now
                },
                new ReferralLink
                {
                    Id = 3,
                    UserId = ADMIN_ID,
                    Link = ADMIN_REFERRAL_LINK_LEFT,
                    ReferralType = ReferralType.LeftWing,
                    InsertDate = DateTime.Now
                },
                new ReferralLink
                {
                    Id = 4,
                    UserId = ADMIN_ID,
                    Link = ADMIN_REFERRAL_LINK_RIGHT,
                    ReferralType = ReferralType.RightWing,
                    InsertDate = DateTime.Now
                }
            );
            #endregion
            #region Seed Roles

            var SUPER_USER_ROLE_ID = "29bd76db-5835-406d-ad1d-7a0901448abd";
            var ADMIN_ROLE_ID = "29bd76db-5835-406d-ad1d-7a0901447c18";
            var USER_ROLE_ID = "d7be43da-622c-4cfe-98a9-5a5161120d24";

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = ADMIN_ROLE_ID, Name = "Admin", NormalizedName = "Admin".ToUpper() },
                new IdentityRole { Id = USER_ROLE_ID, Name = "User", NormalizedName = "User".ToUpper() },
                new IdentityRole { Id = SUPER_USER_ROLE_ID, Name = "Superuser", NormalizedName = "Superuser".ToUpper() }
            );
            #endregion

            #region Seed User Roles

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string> { UserId = ADMIN_ID, RoleId = ADMIN_ROLE_ID },
                new IdentityUserRole<string> { UserId = SUPER_USER_ID, RoleId = SUPER_USER_ROLE_ID }
            );

            #endregion

            #region Seed Navigation menu
            modelBuilder.Entity<NavigationMenu>().HasData(
            new NavigationMenu()
            {
                Id = 1,
                Name = "Access Control",
                ElementIdentifier = "auth_control",
                Icon = "vpn_key",
                DisplayOrder = 100,
                Visible = true,
            },
            new NavigationMenu()
            {
                Id = 2,
                ParentMenuId = 1,
                Name = "Roles",
                ControllerName = "Roles",
                ActionName = "Index",
                ElementIdentifier = "roles",
                Visible = true,
            },
            new NavigationMenu()
            {
                Id = 3,
                ParentMenuId = 1,
                ControllerName = "Roles",
                ActionName = "Create",
                Name = "Create Role",
                ElementIdentifier = "roles",
                Visible = false,
            },
            new NavigationMenu()
            {
                Id = 4,
                ParentMenuId = 1,
                ControllerName = "Roles",
                ActionName = "Edit",
                Name = "Edit Role",
                ElementIdentifier = "roles",
                Visible = false,
            },
            new NavigationMenu()
            {
                Id = 5,
                ParentMenuId = 1,
                ControllerName = "Roles",
                ActionName = "Delete",
                Name = "Delete Role",
                ElementIdentifier = "roles",
                Visible = false,
            },
            new NavigationMenu()
            {
                Id = 6,
                ParentMenuId = 1,
                ControllerName = "Roles",
                ActionName = "EditRolePermission",
                Name = "Edit Role Permission",
                ElementIdentifier = "roles",
                Visible = false,
            },
            new NavigationMenu()
            {
                Id = 7,
                ControllerName = "Dashboard",
                ActionName = "MyProfile",
                Name = "My Profile",
                ElementIdentifier = "profile",
                DisplayOrder = 1,
                Visible = true,
            }
            );

            modelBuilder.Entity<RoleMenuPermission>().HasData(
                new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 1
                },
                new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 2
                },
                new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 3
                }
                ,
                new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 4
                },
                new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 5
                },
                new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 6
                }
                );
            #endregion

            #region Seed Packages

            modelBuilder.Entity<Package>().HasData(
                new Package 
                {
                    Id = 1,
                    Name = "Moon",
                    Period = 24,
                    TotalProfit = 200,
                    ReferralIncome = 7,
                    BinaryIncome = 10,
                    CappingMonthlyLimit = 5000,
                    AvgProfitMonth = 15.73,
                    Description = @"an appropriate opportunity for beginners starting their own business.Find suitable investment with Basic.",
                    FromPrice = 100.00m,
                    ToPrice = 999.00m,
                },
                new Package
                {
                    Id = 2,
                    Name = "Earth",
                    Period = 24,
                    TotalProfit = 220,
                    ReferralIncome = 8,
                    BinaryIncome = 10,
                    CappingMonthlyLimit = 10000,
                    AvgProfitMonth = 18.9,
                    Description = @"for those who have experienced investing before and have started a new way towards a more prosperous investment.",
                    FromPrice = 1000.00m,
                    ToPrice = 9999.00m,
                },
                new Package
                {
                    Id = 3,
                    Name = "Sun",
                    Period = 24,
                    TotalProfit = 240,
                    ReferralIncome = 9,
                    BinaryIncome = 10,
                    CappingMonthlyLimit = 20000,
                    AvgProfitMonth = 22.03,
                    Description = @"an appropriate chance for more profits with more potential facilities.",
                    FromPrice = 10000.00m,
                    ToPrice = 24999.00m,
                },
                new Package
                {
                    Id = 4,
                    Name = "Star",
                    Period = 24,
                    TotalProfit = 260,
                    ReferralIncome = 10,
                    BinaryIncome = 10,
                    CappingMonthlyLimit = 999999999,
                    AvgProfitMonth = 25.17,
                    Description = @"the last package and the best choice for a worthwhile investment.",
                    FromPrice = 25000.00m,
                    ToPrice = -1,
                }
            );

            #endregion

        }
        public static string GetHashedPassword(User user, string password)
        {
            var pass = new PasswordHasher<User>();
            var hashed = pass.HashPassword(user, password);
            return hashed;
        }
    }
}
