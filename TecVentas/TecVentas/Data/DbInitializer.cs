using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TecVentas.Models;

namespace TecVentas.Data
{
    public static class DbInitializer
    {
        public static async Task InicializarAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            
            await context.Database.MigrateAsync();

            var hasher = new PasswordHasher<User>();

            // Admin
            if (!await context.Users.AnyAsync(u => u.Username == "admin"))
            {
                var admin = new User
                {
                    Nombre = "Administrador",
                    Username = "admin",
                    Correo = "admin@tecventas.com",
                    Telefono = "88888888",
                    Role = "Admin"
                };

                admin.Password = hasher.HashPassword(admin, "1234");

                context.Users.Add(admin);
            }

            // User
            if (!await context.Users.AnyAsync(u => u.Username == "user"))
            {
                var user = new User
                {
                    Nombre = "Usuario General",
                    Username = "user",
                    Correo = "user@tecventas.com",
                    Telefono = "77777777",
                    Role = "User"
                };

                user.Password = hasher.HashPassword(user, "1234");

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}