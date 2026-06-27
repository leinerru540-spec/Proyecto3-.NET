using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
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

        public AuthController(AppDbContext context, TokenService tokenService,
            IConfiguration config)
        {
            _context = context;
            _tokenService = tokenService;
            _config = config;
        }

       
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Username == login.Username
                                  && u.Password == login.Password);

            if (user == null)
                return Unauthorized("Credenciales inválidas");

            var token = _tokenService.GenerateToken(user, _config);
            return Ok(new { token });
        }

        
        [Authorize]
        [HttpGet("datos-seguros")]
        public IActionResult GetDatos()
        {
            return Ok("Este endpoint está protegido con JWT");
        }

        
        [AllowAnonymous]
        [HttpGet("publico")]
        public IActionResult GetPublico()
        {
            return Ok("Este endpoint es público y no requiere token");
        }
    }
}