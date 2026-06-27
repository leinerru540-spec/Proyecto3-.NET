using TecVentas.Models;

namespace TecVentas.Models
{
    public class Venta
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public int ProductoId { get; set; }
        public Producto? Producto { get; set; }

        public DateTime Fecha { get; set; }

        public int Cantidad { get; set; }

        public decimal Total { get; set; }
    }
}