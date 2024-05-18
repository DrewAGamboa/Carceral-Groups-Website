using Microsoft.EntityFrameworkCore;

namespace CarceralGroupsAPI
{
    public class AppDbContext: DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        public AppDbContext() {}

        protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseSqlServer(@"Server=tcp:carceral-webmap-mssql.database.windows.net,1433;Initial Catalog=carceral-webmap-db;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication=""Active Directory Default"";");
    }

    public class Blog
    {
        public int BlogId { get; set; }
        public string? Url { get; set; }

        public List<Post> Posts { get; } = [];
    }

    public class Post
    {
        public int PostId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }

        public int BlogId { get; set; }
        public Blog? Blog { get; set; }
    }
}