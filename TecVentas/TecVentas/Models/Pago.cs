using System;

namespace TecVentas.Models
{
    public class Pago
    {
        public int PagoId { get; set; }          // Clave primaria
        public int VentaId { get; set; }         // Relación con la venta
        public int ClienteId { get; set; }       // Relación con el cliente
        public decimal Monto { get; set; }       // Monto del pago
        public string MetodoPago { get; set; }   // Tarjeta, PayPal, etc.
        public DateTime FechaHora { get; set; }  // Fecha y hora del pago
        public string Estado { get; set; }       // Ej: "Completado", "Pendiente"
        public string CodigoAutorizacion { get; set; } // Código de autorización
    }
}
