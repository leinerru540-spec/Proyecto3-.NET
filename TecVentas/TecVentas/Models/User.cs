namespace TecVentas.Models
{
    public class User
    {
        public int Id { get; set; }

        public required string Nombre { get; set; }

        public required string Username { get; set; }

        public string Password { get; set; } = null!;

        public required string Correo { get; set; }

        public string? Telefono { get; set; }

        public string Role { get; set; } = "User";
    }
}