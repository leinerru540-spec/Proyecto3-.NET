using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecVentas.Data;
using TecVentas.Models;
using TecVentas.Services;

namespace TecVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly CloudinaryService _cloudinary;

        public ProductosController(AppDbContext context, CloudinaryService cloudinary)
        {
            _context = context;
            _cloudinary = cloudinary;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
                return NotFound();

            return producto;
        }

        
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto([FromForm] ProductoDTO dto)
        {
            string imagenUrl = null;

            if (dto.Imagen != null)
            {
                imagenUrl = await _cloudinary.SubirImagen(dto.Imagen);
            }

            var producto = new Producto
            {
                Nombre = dto.Nombre,
                Precio = dto.Precio,
                Stock = dto.Stock,
                Imagen = imagenUrl
            };

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, [FromForm] ProductoDTO dto)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
                return NotFound();

            producto.Nombre = dto.Nombre;
            producto.Precio = dto.Precio;
            producto.Stock = dto.Stock;

            if (dto.Imagen != null)
            {
                producto.Imagen = await _cloudinary.SubirImagen(dto.Imagen);
            }

            await _context.SaveChangesAsync();

            return Ok(producto);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
                return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}