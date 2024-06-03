using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carceral_groups_api.Migrations
{
    /// <inheritdoc />
    public partial class AddCitationToDocument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Citation",
                table: "Documents",
                type: "nvarchar(1024)",
                maxLength: 1024,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Citation",
                table: "Documents");
        }
    }
}
