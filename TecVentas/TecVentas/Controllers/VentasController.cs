using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecVentas.Data;
using TecVentas.Models;

namespace TecVentas.Controllers
{
    public class ItemValidacion
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
    }

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
                .Include(v => v.User)
                .Include(v => v.Producto)
                .ToListAsync();
        }

        // GET: api/Ventas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Ventas
                .Include(v => v.User)
                .Include(v => v.Producto)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venta == null)
                return NotFound();

            return venta;
        }

        // POST: api/Ventas/validar-stock
        [HttpPost("validar-stock")]
        public async Task<IActionResult> ValidarStock([FromBody] List<ItemValidacion> items)
        {
            if (items == null || items.Count == 0)
                return BadRequest(new { mensaje = "No se enviaron productos para validar" });

            var errores = new List<string>();

            foreach (var item in items)
            {
                var producto = await _context.Productos.FindAsync(item.ProductoId);

                if (producto == null)
                {
                    errores.Add($"Producto {item.ProductoId} no encontrado");
                    continue;
                }

                if (producto.Stock < item.Cantidad)
                {
                    errores.Add($"{producto.Nombre}: solo quedan {producto.Stock} unidades disponibles");
                }
            }

            if (errores.Count > 0)
                return BadRequest(new { mensaje = "Stock insuficiente", errores });

            return Ok(new { mensaje = "Stock disponible" });
        }

        // POST: api/Ventas
        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta([FromBody] Venta venta)
        {
            var user = await _context.Users.FindAsync(venta.UserId);
            if (user == null)
                return BadRequest("Usuario no encontrado");

            var producto = await _context.Productos.FindAsync(venta.ProductoId);
            if (producto == null)
                return BadRequest("Producto no encontrado");

            
            if (producto.Stock < venta.Cantidad)
                return BadRequest("Stock insuficiente");

            
            producto.Stock -= venta.Cantidad;
            _context.Productos.Update(producto);

            venta.Total = producto.Precio * venta.Cantidad;
            venta.Fecha = DateTime.Now;
            venta.User = null;
            venta.Producto = null;

            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVenta), new { id = venta.Id }, venta);
        }

        // PUT: api/Ventas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenta(int id, Venta venta)
        {
            if (id != venta.Id)
                return BadRequest();

            var user = await _context.Users.FindAsync(venta.UserId);
            if (user == null)
                return BadRequest("Usuario no encontrado");

            var producto = await _context.Productos.FindAsync(venta.ProductoId);
            if (producto == null)
                return BadRequest("Producto no encontrado");

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

            if (venta == null)
                return NotFound();

            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}