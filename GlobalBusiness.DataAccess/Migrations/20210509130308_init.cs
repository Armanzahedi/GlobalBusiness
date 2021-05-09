using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GlobalBusiness.DataAccess.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetNavigationMenu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentMenuId = table.Column<int>(type: "int", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: true),
                    ElementIdentifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ControllerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetNavigationMenu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetNavigationMenu_AspNetNavigationMenu_ParentMenuId",
                        column: x => x.ParentMenuId,
                        principalTable: "AspNetNavigationMenu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    PassportNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TableName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EntityId = table.Column<int>(type: "int", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ActionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OldValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Package",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ToPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Period = table.Column<byte>(type: "tinyint", nullable: false),
                    TotalProfit = table.Column<double>(type: "float", nullable: false),
                    ReferralIncome = table.Column<double>(type: "float", nullable: false),
                    BinaryIncome = table.Column<double>(type: "float", nullable: false),
                    CappingMonthlyLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AvgProfitMonth = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    InsertDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    InsertUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Package", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SystemParameters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InsertDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    InsertUser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UpdateUser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemParameters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleMenuPermission",
                columns: table => new
                {
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NavigationMenuId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleMenuPermission", x => new { x.RoleId, x.NavigationMenuId });
                    table.ForeignKey(
                        name: "FK_AspNetRoleMenuPermission_AspNetNavigationMenu_NavigationMenuId",
                        column: x => x.NavigationMenuId,
                        principalTable: "AspNetNavigationMenu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReferralLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReferralType = table.Column<int>(type: "int", nullable: false),
                    InsertDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReferralLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReferralLinks_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReferralTree",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentNodeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ChildNodeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReferralType = table.Column<int>(type: "int", nullable: false),
                    InsertDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReferralTree", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReferralTree_AspNetUsers_ChildNodeId",
                        column: x => x.ChildNodeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ReferralTree_AspNetUsers_ParentNodeId",
                        column: x => x.ParentNodeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetNavigationMenu",
                columns: new[] { "Id", "ActionName", "ControllerName", "DisplayOrder", "ElementIdentifier", "Icon", "Name", "ParentMenuId", "Visible" },
                values: new object[] { 1, null, null, 100, "auth_control", "vpn_key", "Access Control", null, true });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "29bd76db-5835-406d-ad1d-7a0901447c18", "e5f87b98-9296-4643-ba8a-8fde3e07e492", "Admin", "ADMIN" },
                    { "d7be43da-622c-4cfe-98a9-5a5161120d24", "7fd2227c-7501-43e8-b16e-0cd05697f9d2", "User", "USER" },
                    { "29bd76db-5835-406d-ad1d-7a0901448abd", "70326d87-7a2d-4beb-9f7d-488a8a08c7af", "Superuser", "SUPERUSER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Avatar", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PassportNumber", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "75625814-138e-4831-a1ea-bf58e211adff", 0, "user-avatar.png", "a6c761ab-0e2c-4125-bd33-ca4f0eaa798b", "Admin@Admin.com", false, "Admin", "Admin", false, null, "ADMIN@ADMIN.COM", "ADMIN", null, "AQAAAAEAACcQAAAAEMXnXHgkDRpiYVJummuDH+KAAcAMN9jkyvVcjJL+PXwwD+BJq3nbgT8uKNVu47J69w==", null, false, "f35dec09-8c3a-44a2-a5aa-c44a6a9dabe5", false, "Admin" },
                    { "75625814-138e-4831-a1ea-bf58e211acmf", 0, "user-avatar.png", "59a87a8b-9036-4092-bb5f-e1d555f48431", "Superuser@Superuser.com", false, "Superuser", "Superuser", false, null, "SUPERUSER@SUPERUSER.COM", "SUPERUSER", null, "AQAAAAEAACcQAAAAEDR+cz/7MzDjrppqfAThlLT/L9ympMG/wLF1nzvrNFZ5G8/jwLMSCV26Pa8ESElNXQ==", null, false, "ef285669-e586-4f4e-97d4-f456e13ade95", false, "Superuser" }
                });

            migrationBuilder.InsertData(
                table: "Package",
                columns: new[] { "Id", "AvgProfitMonth", "BinaryIncome", "CappingMonthlyLimit", "Description", "FromPrice", "InsertDate", "InsertUser", "IsDeleted", "Name", "Period", "ReferralIncome", "ToPrice", "TotalProfit", "UpdateDate", "UpdateUser" },
                values: new object[,]
                {
                    { 1, 15.73, 10.0, 5000m, "an appropriate opportunity for beginners starting their own business.Find suitable investment with Basic.", 100.00m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false, "Moon", (byte)24, 7.0, 999.00m, 200.0, null, null },
                    { 2, 18.899999999999999, 10.0, 10000m, "for those who have experienced investing before and have started a new way towards a more prosperous investment.", 1000.00m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false, "Earth", (byte)24, 8.0, 9999.00m, 220.0, null, null },
                    { 3, 22.030000000000001, 10.0, 20000m, "an appropriate chance for more profits with more potential facilities.", 10000.00m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false, "Sun", (byte)24, 9.0, 24999.00m, 240.0, null, null },
                    { 4, 25.170000000000002, 10.0, 999999999m, "the last package and the best choice for a worthwhile investment.", 25000.00m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false, "Star", (byte)24, 10.0, -1m, 260.0, null, null }
                });

            migrationBuilder.InsertData(
                table: "AspNetNavigationMenu",
                columns: new[] { "Id", "ActionName", "ControllerName", "DisplayOrder", "ElementIdentifier", "Icon", "Name", "ParentMenuId", "Visible" },
                values: new object[,]
                {
                    { 2, "Index", "Roles", null, "roles", null, "Roles", 1, true },
                    { 3, "Create", "Roles", null, "roles", null, "Create Role", 1, false },
                    { 4, "Edit", "Roles", null, "roles", null, "Edit Role", 1, false },
                    { 5, "Delete", "Roles", null, "roles", null, "Delete Role", 1, false },
                    { 6, "EditRolePermission", "Roles", null, "roles", null, "Edit Role Permission", 1, false }
                });

            migrationBuilder.InsertData(
                table: "AspNetRoleMenuPermission",
                columns: new[] { "NavigationMenuId", "RoleId" },
                values: new object[] { 1, "29bd76db-5835-406d-ad1d-7a0901448abd" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "29bd76db-5835-406d-ad1d-7a0901447c18", "75625814-138e-4831-a1ea-bf58e211adff" },
                    { "29bd76db-5835-406d-ad1d-7a0901448abd", "75625814-138e-4831-a1ea-bf58e211acmf" }
                });

            migrationBuilder.InsertData(
                table: "ReferralLinks",
                columns: new[] { "Id", "InsertDate", "IsDeleted", "Link", "ReferralType", "UserId" },
                values: new object[,]
                {
                    { 3, new DateTime(2021, 5, 9, 17, 33, 6, 934, DateTimeKind.Local).AddTicks(571), false, "29bd76db", 1, "75625814-138e-4831-a1ea-bf58e211adff" },
                    { 4, new DateTime(2021, 5, 9, 17, 33, 6, 934, DateTimeKind.Local).AddTicks(590), false, "91tm83ps", 2, "75625814-138e-4831-a1ea-bf58e211adff" },
                    { 1, new DateTime(2021, 5, 9, 17, 33, 6, 930, DateTimeKind.Local).AddTicks(1689), false, "23ad82tw", 1, "75625814-138e-4831-a1ea-bf58e211acmf" },
                    { 2, new DateTime(2021, 5, 9, 17, 33, 6, 934, DateTimeKind.Local).AddTicks(502), false, "65gh72tn", 2, "75625814-138e-4831-a1ea-bf58e211acmf" }
                });

            migrationBuilder.InsertData(
                table: "AspNetRoleMenuPermission",
                columns: new[] { "NavigationMenuId", "RoleId" },
                values: new object[,]
                {
                    { 2, "29bd76db-5835-406d-ad1d-7a0901448abd" },
                    { 3, "29bd76db-5835-406d-ad1d-7a0901448abd" },
                    { 4, "29bd76db-5835-406d-ad1d-7a0901448abd" },
                    { 5, "29bd76db-5835-406d-ad1d-7a0901448abd" },
                    { 6, "29bd76db-5835-406d-ad1d-7a0901448abd" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetNavigationMenu_ParentMenuId",
                table: "AspNetNavigationMenu",
                column: "ParentMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleMenuPermission_NavigationMenuId",
                table: "AspNetRoleMenuPermission",
                column: "NavigationMenuId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ReferralLinks_UserId",
                table: "ReferralLinks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReferralTree_ChildNodeId",
                table: "ReferralTree",
                column: "ChildNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_ReferralTree_ParentNodeId",
                table: "ReferralTree",
                column: "ParentNodeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetRoleMenuPermission");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Package");

            migrationBuilder.DropTable(
                name: "ReferralLinks");

            migrationBuilder.DropTable(
                name: "ReferralTree");

            migrationBuilder.DropTable(
                name: "SystemParameters");

            migrationBuilder.DropTable(
                name: "AspNetNavigationMenu");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
