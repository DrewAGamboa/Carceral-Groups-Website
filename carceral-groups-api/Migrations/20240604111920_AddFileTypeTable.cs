using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carceral_groups_api.Migrations
{
    /// <inheritdoc />
    public partial class AddFileTypeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FileTypeId",
                table: "Documents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FileTypes",
                columns: table => new
                {
                    FileTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileTypes", x => x.FileTypeId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Documents_FileTypeId",
                table: "Documents",
                column: "FileTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_FileTypes_FileTypeId",
                table: "Documents",
                column: "FileTypeId",
                principalTable: "FileTypes",
                principalColumn: "FileTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_FileTypes_FileTypeId",
                table: "Documents");

            migrationBuilder.DropTable(
                name: "FileTypes");

            migrationBuilder.DropIndex(
                name: "IX_Documents_FileTypeId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "FileTypeId",
                table: "Documents");
        }
    }
}
