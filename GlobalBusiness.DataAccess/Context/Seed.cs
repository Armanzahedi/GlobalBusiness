using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GlobalBusiness.Core.Entities;
using GlobalBusiness.DataAccess.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GlobalBusiness.DataAccess.Seed
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

            #region Seed Navigation menue

            #endregion

            modelBuilder.Entity<NavigationMenu>().HasData(
                new NavigationMenu()
                {
                    Id = 1,
                    Name = "Acsess Control",
                    ElementIdentifier = "auth_control",
                    Icon = "<i class='mi'>vpn_key</ i>",
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
                , new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 4
                }, new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 5
                }, new RoleMenuPermission()
                {
                    RoleId = SUPER_USER_ROLE_ID,
                    NavigationMenuId = 6
                }
                );

            //new NavigationMenu()
            //{
            //    Id = new Guid("913BF559-DB46-4072-BD01-F73F3C92E5D5"),
            //    Name = "Create Role",
            //    ControllerName = "Admin",
            //    ActionName = "CreateRole",
            //    ParentMenuId = new Guid("13e2f21a-4283-4ff8-bb7a-096e7b89e0f0"),
            //    DisplayOrder = 3,
            //    Visible = true,
            //},
            //new NavigationMenu()
            //{
            //    Id = new Guid("3C1702C5-C34F-4468-B807-3A1D5545F734"),
            //    Name = "Edit User",
            //    ControllerName = "Admin",
            //    ActionName = "EditUser",
            //    ParentMenuId = new Guid("13e2f21a-4283-4ff8-bb7a-096e7b89e0f0"),
            //    DisplayOrder = 3,
            //    Visible = false,
            //},
            //new NavigationMenu()
            //{
            //    Id = new Guid("94C22F11-6DD2-4B9C-95F7-9DD4EA1002E6"),
            //    Name = "Edit Role Permission",
            //    ControllerName = "Admin",
            //    ActionName = "EditRolePermission",
            //    ParentMenuId = new Guid("13e2f21a-4283-4ff8-bb7a-096e7b89e0f0"),
            //    DisplayOrder = 3,
            //    Visible = false,
            //}
            //);

        }
        public static string GetHashedPassword(User user, string password)
        {
            var pass = new PasswordHasher<User>();
            var hashed = pass.HashPassword(user, password);
            return hashed;
        }
    }
}
