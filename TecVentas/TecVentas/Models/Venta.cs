using TecVentas.Models;

public class Venta
{
    public int Id { get; set; }

    public int ClienteId { get; set; }
    public Cliente? Cliente { get; set; }   // ← opcional

    public int ProductoId { get; set; }
    public Producto? Producto { get; set; } // ← opcional

    public DateTime Fecha { get; set; }
    public int Cantidad { get; set; }
    public decimal Total { get; set; }
}




