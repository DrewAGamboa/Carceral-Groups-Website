using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carceral_groups_api.Migrations
{
    /// <inheritdoc />
    public partial class ToGeographicLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DocumentGeographicLocation",
                columns: table => new
                {
                    DocumentId = table.Column<int>(type: "int", nullable: false),
                    ToGeographicLocationsGeographicLocationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentGeographicLocation", x => new { x.DocumentId, x.ToGeographicLocationsGeographicLocationId });
                    table.ForeignKey(
                        name: "FK_DocumentGeographicLocation_Documents_DocumentId",
                        column: x => x.DocumentId,
                        principalTable: "Documents",
                        principalColumn: "DocumentId");
                    table.ForeignKey(
                        name: "FK_DocumentGeographicLocation_GeographicLocations_ToGeographicLocationsGeographicLocationId",
                        column: x => x.ToGeographicLocationsGeographicLocationId,
                        principalTable: "GeographicLocations",
                        principalColumn: "GeographicLocationId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentGeographicLocation_ToGeographicLocationsGeographicLocationId",
                table: "DocumentGeographicLocation",
                column: "ToGeographicLocationsGeographicLocationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentGeographicLocation");
        }
    }
}
