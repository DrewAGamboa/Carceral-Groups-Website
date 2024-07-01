using Microsoft.EntityFrameworkCore;

namespace CarceralGroupsAPI
{
    public class AppDbContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }
        public DbSet<FileType> FileTypes { get; set; }
        public DbSet<GeographicLocation> GeographicLocations { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<LocationDocumentStat> LocationDocumentStats { get; set; }

        public AppDbContext() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<LocationDocumentStat>()
                .HasKey(m => new { m.CategoryId, m.InstitutionId, m.GeographicLocationId });

            modelBuilder.Entity<Document>()
                .HasMany(e => e.ToGeographicLocations)
                .WithMany()
                .UsingEntity(
                    l => l.HasOne(typeof(GeographicLocation)).WithMany().OnDelete(DeleteBehavior.ClientCascade),
                    r => r.HasOne(typeof(Document)).WithMany().OnDelete(DeleteBehavior.ClientCascade)
                );
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseSqlServer(@"Server=tcp:carceral-webmap-mssql.database.windows.net,1433;Initial Catalog=carceral-webmap-db;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication=""Active Directory Default"";");
    }
}