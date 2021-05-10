using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GlobalBusiness.DataAccess.Migrations
{
    public partial class AddedIsDeletedToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetNavigationMenu",
                columns: new[] { "Id", "ActionName", "ControllerName", "DisplayOrder", "ElementIdentifier", "Icon", "Name", "ParentMenuId", "Visible" },
                values: new object[] { 7, "MyProfile", "Dashboard", 1, "profile", null, "My Profile", null, true });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29bd76db-5835-406d-ad1d-7a0901447c18",
                column: "ConcurrencyStamp",
                value: "d49ca7ac-c3bf-4a89-9bb2-6252447be2ef");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29bd76db-5835-406d-ad1d-7a0901448abd",
                column: "ConcurrencyStamp",
                value: "1f004f23-13dc-4f67-bcef-d93fb094a738");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d7be43da-622c-4cfe-98a9-5a5161120d24",
                column: "ConcurrencyStamp",
                value: "e22e3887-e093-4d05-8714-9347ce115826");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "75625814-138e-4831-a1ea-bf58e211acmf",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a50bd8fc-9da9-4734-84eb-16747b48aea9", "AQAAAAEAACcQAAAAEPApmBOA/oKF+/9ntRoAOp+JFrgaAv5nWx33Z9H3Ex/silxDQusJYkZgn99uv6cRgQ==", "cdf253cd-ae9c-44ee-8069-f326ed312aae" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "75625814-138e-4831-a1ea-bf58e211adff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ef773123-0539-4d58-acd5-6c638336d679", "AQAAAAEAACcQAAAAENfPAE9MU+IH9wmP8zpAdJ8wEsy6eIJRYwoHUxsie1gkPq/YeZOV969/FzSism/CWA==", "0989ffb1-7057-4909-a632-f50f4146d353" });

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 1,
                column: "InsertDate",
                value: new DateTime(2021, 5, 10, 16, 28, 55, 538, DateTimeKind.Local).AddTicks(7443));

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 2,
                column: "InsertDate",
                value: new DateTime(2021, 5, 10, 16, 28, 55, 545, DateTimeKind.Local).AddTicks(1272));

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 3,
                column: "InsertDate",
                value: new DateTime(2021, 5, 10, 16, 28, 55, 545, DateTimeKind.Local).AddTicks(3438));

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 4,
                column: "InsertDate",
                value: new DateTime(2021, 5, 10, 16, 28, 55, 545, DateTimeKind.Local).AddTicks(3496));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetNavigationMenu",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29bd76db-5835-406d-ad1d-7a0901447c18",
                column: "ConcurrencyStamp",
                value: "e5f87b98-9296-4643-ba8a-8fde3e07e492");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29bd76db-5835-406d-ad1d-7a0901448abd",
                column: "ConcurrencyStamp",
                value: "70326d87-7a2d-4beb-9f7d-488a8a08c7af");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d7be43da-622c-4cfe-98a9-5a5161120d24",
                column: "ConcurrencyStamp",
                value: "7fd2227c-7501-43e8-b16e-0cd05697f9d2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "75625814-138e-4831-a1ea-bf58e211acmf",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "59a87a8b-9036-4092-bb5f-e1d555f48431", "AQAAAAEAACcQAAAAEDR+cz/7MzDjrppqfAThlLT/L9ympMG/wLF1nzvrNFZ5G8/jwLMSCV26Pa8ESElNXQ==", "ef285669-e586-4f4e-97d4-f456e13ade95" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "75625814-138e-4831-a1ea-bf58e211adff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a6c761ab-0e2c-4125-bd33-ca4f0eaa798b", "AQAAAAEAACcQAAAAEMXnXHgkDRpiYVJummuDH+KAAcAMN9jkyvVcjJL+PXwwD+BJq3nbgT8uKNVu47J69w==", "f35dec09-8c3a-44a2-a5aa-c44a6a9dabe5" });

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 1,
                column: "InsertDate",
                value: new DateTime(2021, 5, 9, 17, 33, 6, 930, DateTimeKind.Local).AddTicks(1689));

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 2,
                column: "InsertDate",
                value: new DateTime(2021, 5, 9, 17, 33, 6, 934, DateTimeKind.Local).AddTicks(502));

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 3,
                column: "InsertDate",
                value: new DateTime(2021, 5, 9, 17, 33, 6, 934, DateTimeKind.Local).AddTicks(571));

            migrationBuilder.UpdateData(
                table: "ReferralLinks",
                keyColumn: "Id",
                keyValue: 4,
                column: "InsertDate",
                value: new DateTime(2021, 5, 9, 17, 33, 6, 934, DateTimeKind.Local).AddTicks(590));
        }
    }
}
