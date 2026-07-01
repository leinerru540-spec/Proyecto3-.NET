using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TecVentas.Data;
using TecVentas.Models;
using TecVentas.Services;

namespace TecVentas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _config;

        public AuthController(
            AppDbContext context,
            TokenService tokenService,
            IConfiguration config)
        {
            _context = context;
            _tokenService = tokenService;
            _config = config;
        }

        // Login
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Username == login.Username);

            if (user == null)
                return Unauthorized("Credenciales inválidas");

            var hasher = new PasswordHasher<User>();

            var resultado = hasher.VerifyHashedPassword(
                user,
                user.Password,
                login.Password);

            if (resultado == PasswordVerificationResult.Failed)
                return Unauthorized("Credenciales inválidas");

            var token = _tokenService.GenerateToken(user, _config);

            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.Nombre,
                    user.Username,
                    user.Correo,
                    user.Telefono,
                    user.Role
                }
            });
        }


        [AllowAnonymous]
        [HttpGet("publico")]
        public IActionResult GetPublico()
        {
            return Ok("Este endpoint es público y no requiere token.");
        }


        [Authorize]
        [HttpGet("datos-seguros")]
        public IActionResult GetDatos()
        {
            return Ok("Este endpoint está protegido con JWT.");
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // Usuario por ID
        [Authorize(Roles = "Admin")]
        [HttpGet("users/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            return user;
        }

        // Crear usuario
        [Authorize(Roles = "Admin")]
        [HttpPost("users")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var hasher = new PasswordHasher<User>();

            user.Password = hasher.HashPassword(user, user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // Editar usuario
        [Authorize(Roles = "Admin")]
        [HttpPut("users/{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest();

            var usuarioExistente = await _context.Users.FindAsync(id);

            if (usuarioExistente == null)
                return NotFound();

            usuarioExistente.Nombre = user.Nombre;
            usuarioExistente.Username = user.Username;
            usuarioExistente.Correo = user.Correo;
            usuarioExistente.Telefono = user.Telefono;
            usuarioExistente.Role = user.Role;


            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                var hasher = new PasswordHasher<User>();

                usuarioExistente.Password = hasher.HashPassword(
                    usuarioExistente,
                    user.Password);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Mi perfil

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized();

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound();

            return Ok(new
            {
                user.Id,
                user.Nombre,
                user.Username,
                user.Correo,
                user.Telefono,
                user.Role
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var existe = await _context.Users.AnyAsync(u => u.Username == user.Username);
            if (existe)
                return BadRequest("El usuario ya existe");

            var hasher = new PasswordHasher<User>();
            user.Password = hasher.HashPassword(user, user.Password);
            user.Role = "User";

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Usuario registrado correctamente" });
        }

        // Eliminar usuario
        [Authorize(Roles = "Admin")]
        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}