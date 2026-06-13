using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TecVentas.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            // Cadena genérica, cada compañero puede ajustarla en su máquina
            optionsBuilder.UseSqlServer("Server=.;Database=TecVentasDB;Trusted_Connection=True;TrustServerCertificate=True;");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}

