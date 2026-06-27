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
                optionsBuilder.UseSqlServer("Server=.;Database=TecVentasDB;Trusted_Connection=True;TrustServerCertificate=True;");
            }
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Venta> Ventas { get; set; }

        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Password = "1234",   
                    Role = "Admin"
                },
                new User
                {
                    Id = 2,
                    Username = "user",
                    Password = "1234",
                    Role = "User"
                }
    );
        }

    }
        }



