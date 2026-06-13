using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecVentas.Data;
using TecVentas.Models;

namespace TecVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Ventas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
        {
            return await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Producto)
                .ToListAsync();
        }

        // GET: api/Ventas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Producto)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venta == null) return NotFound();
            return venta;
        }
        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta([FromBody] Venta venta)
        {
            var cliente = await _context.Clientes.FindAsync(venta.ClienteId);
            if (cliente == null) return BadRequest("Cliente no encontrado");

            var producto = await _context.Productos.FindAsync(venta.ProductoId);
            if (producto == null) return BadRequest("Producto no encontrado");

            venta.Total = producto.Precio * venta.Cantidad;
            venta.Fecha = DateTime.Now;

            // Evitar que el binder exija objetos completos
            venta.Cliente = null;
            venta.Producto = null;

            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVenta), new { id = venta.Id }, venta);
        }




        // PUT: api/Ventas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenta(int id, Venta venta)
        {
            if (id != venta.Id) return BadRequest();

            // Validar producto para recalcular total
            var producto = await _context.Productos.FindAsync(venta.ProductoId);
            if (producto == null) return BadRequest("Producto no encontrado");

            venta.Total = producto.Precio * venta.Cantidad;

            _context.Entry(venta).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Ventas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenta(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);
            if (venta == null) return NotFound();

            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}


