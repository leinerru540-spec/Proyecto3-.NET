using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class PayPalController : ControllerBase
{
    private readonly PayPalService _payPalService;

    public PayPalController(PayPalService payPalService)
    {
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
}