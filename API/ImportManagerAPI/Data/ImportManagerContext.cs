using ImportManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ImportManagerAPI.Data;

public class ImportManagerContext : DbContext
{
    private readonly IConfiguration _configuration;

    public ImportManagerContext(DbContextOptions<ImportManagerContext> options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<StockMovimentation> StockMovimentations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        #region PKs
        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);
        modelBuilder.Entity<Product>()
            .HasKey(p => p.Id);
        modelBuilder.Entity<StockMovimentation>()
            .HasKey(sm => sm.Id);
        #endregion

        #region Relacionamentos
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Owner)
            .WithMany()
            .HasForeignKey(p => p.OwnerTaxPayerDocument)
            .HasPrincipalKey(u => u.TaxPayerDocument)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<StockMovimentation>()
            .HasOne(sm => sm.Product)
            .WithMany()
            .HasForeignKey(sm => sm.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StockMovimentation>()
            .HasOne(sm => sm.User)
            .WithMany()
            .HasForeignKey(sm => sm.UserId)
            .OnDelete(DeleteBehavior.Restrict);
        #endregion
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlite(connectionString, options =>
            {
                options.MigrationsHistoryTable("__EFMigrationsHistory");
            });
        }
    }
}