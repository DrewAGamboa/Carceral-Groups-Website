using Microsoft.EntityFrameworkCore;

namespace CarceralGroupsAPI
{
    public class AppDbContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }
        public DbSet<GeographicLocation> GeographicLocations { get; set; }
        public DbSet<Institution> Institutions { get; set; }

        public AppDbContext() {}

        protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseSqlServer(@"Server=tcp:carceral-webmap-mssql.database.windows.net,1433;Initial Catalog=carceral-webmap-db;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication=""Active Directory Default"";");
    }
}