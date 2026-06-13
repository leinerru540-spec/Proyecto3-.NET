using Microsoft.EntityFrameworkCore;
using TecVentas.Models;

namespace TecVentas.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Método para configurar el proveedor en tiempo de diseño
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=LEINER98\\Leiner;Database=TecVentasDB;Trusted_Connection=True;TrustServerCertificate=True;");
            }
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Venta> Ventas { get; set; }
    }
}



