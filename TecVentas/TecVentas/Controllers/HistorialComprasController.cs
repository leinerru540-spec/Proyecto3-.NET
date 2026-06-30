using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TecVentas.Data;
using TecVentas.DTOs;

namespace TecVentas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HistorialComprasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistorialComprasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialCompraDto>>> GetHistorial()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized();

            var historial = await _context.Ventas
                .Include(v => v.Producto)
                .Where(v => v.UserId == userId)
                .OrderByDescending(v => v.Fecha)
                .Select(v => new HistorialCompraDto
                {
                    VentaId = v.Id,
                    Fecha = v.Fecha,

                    ProductoNombre = v.Producto != null
                        ? v.Producto.Nombre
                        : "Producto eliminado",

                    
                    Imagen = v.Producto != null
                        ? v.Producto.Imagen
                        : "",

                    Cantidad = v.Cantidad,
                    Total = v.Total,

                    EstadoPago = _context.Pagos
                        .Where(p => p.VentaId == v.Id)
                        .Select(p => p.Estado)
                        .FirstOrDefault() ?? "Sin pago registrado",

                    MetodoPago = _context.Pagos
                        .Where(p => p.VentaId == v.Id)
                        .Select(p => p.MetodoPago)
                        .FirstOrDefault() ?? "-"
                })
                .ToListAsync();

            return Ok(historial);
        }
    }
}