using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace carceral_groups_api.Migrations
{
    /// <inheritdoc />
    public partial class AddLocationDocumentStats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LocationDocumentStats",
                columns: table => new
                {
                    LocationDocumentStatId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    InstitutionId = table.Column<int>(type: "int", nullable: false),
                    GeographicLocationId = table.Column<int>(type: "int", nullable: false),
                    DocumentCount = table.Column<int>(type: "int", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationDocumentStats", x => x.LocationDocumentStatId);
                    table.ForeignKey(
                        name: "FK_LocationDocumentStats_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LocationDocumentStats_GeographicLocations_GeographicLocationId",
                        column: x => x.GeographicLocationId,
                        principalTable: "GeographicLocations",
                        principalColumn: "GeographicLocationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LocationDocumentStats_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "InstitutionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LocationDocumentStats_CategoryId",
                table: "LocationDocumentStats",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_LocationDocumentStats_GeographicLocationId",
                table: "LocationDocumentStats",
                column: "GeographicLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_LocationDocumentStats_InstitutionId",
                table: "LocationDocumentStats",
                column: "InstitutionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LocationDocumentStats");
        }
    }
}
