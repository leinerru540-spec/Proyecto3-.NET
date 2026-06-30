namespace TecVentas.DTOs
{
    public class HistorialCompraDto
    {
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public string ProductoNombre { get; set; } = string.Empty;

        
        public string Imagen { get; set; } = string.Empty;

        public int Cantidad { get; set; }
        public decimal Total { get; set; }
        public string EstadoPago { get; set; } = string.Empty;
        public string MetodoPago { get; set; } = string.Empty;
    }
}