using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TecVentas.Models;
using TecVentas.Data;

namespace TecVentas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PayPalController : ControllerBase
    {
        private readonly PayPalService _payPalService;
        private readonly AppDbContext _context;

        public PayPalController(AppDbContext context, PayPalService payPalService)
        {
            _context = context;
            _payPalService = payPalService;
        }

       
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder(decimal amount)
        {
            try
            {
                JsonDocument order = await _payPalService.CreateOrder(amount);
                return Ok(order.RootElement);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensaje = "Error al crear la orden en PayPal.",
                    detalle = ex.Message
                });
            }
        }

       
        [HttpGet("success")]
        public IActionResult Success()
        {
            return Ok(new
            {
                mensaje = "Pago completado con éxito."
            });
        }

       
        [HttpGet("cancel")]
        public IActionResult Cancel()
        {
            return Ok(new
            {
                mensaje = "Pago cancelado."
            });
        }

        [HttpPost("capture-order")]
        public async Task<IActionResult> CaptureOrder([FromQuery] string token)
        {
            try
            {
                JsonDocument result = await _payPalService.CaptureOrder(token);
                return Ok(result.RootElement);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al capturar la orden.", detalle = ex.Message });
            }
        }

        
        [HttpPost("confirmar-venta")]
        public async Task<IActionResult> ConfirmarVenta([FromBody] Venta venta)
        {
            var user = await _context.Users.FindAsync(venta.UserId);
            if (user == null)
                return BadRequest("Usuario no encontrado");

            var producto = await _context.Productos.FindAsync(venta.ProductoId);
            if (producto == null)
                return BadRequest("Producto no encontrado");

            venta.Total = producto.Precio * venta.Cantidad;
            venta.Fecha = DateTime.Now;

            venta.User = null;
            venta.Producto = null;

            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Venta registrada correctamente" });
        }
    }
}