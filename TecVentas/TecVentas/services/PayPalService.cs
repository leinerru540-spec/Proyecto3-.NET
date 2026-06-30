using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

public class PayPalService
{
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;

    public PayPalService(IConfiguration config, HttpClient httpClient)
    {
        _config = config;
        _httpClient = httpClient;
    }

    private async Task<string> GetAccessToken()
    {
        var clientId = _config["PayPal:ClientId"];
        var secret = _config["PayPal:Secret"];

        var auth = Convert.ToBase64String(
            Encoding.UTF8.GetBytes($"{clientId}:{secret}")
        );

        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", auth);

        var body = new Dictionary<string, string>
        {
            { "grant_type", "client_credentials" }
        };

        var response = await _httpClient.PostAsync(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            new FormUrlEncodedContent(body)
        );

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error obteniendo token de PayPal: {error}");
        }

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);

        return doc.RootElement.GetProperty("access_token").GetString()!;
    }

    public async Task<JsonDocument> CreateOrder(decimal amount)
    {
        var token = await GetAccessToken();

        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        var order = new
        {
            intent = "CAPTURE",
            purchase_units = new[]
            {
                new
                {
                    amount = new
                    {
                        currency_code = "USD",
                        value = amount.ToString("0.00")
                    }
                }
            },
            application_context = new
            {
                return_url = "http://localhost:5173/pago-exitoso",
                cancel_url = "http://localhost:5173/pago-cancelado"
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(order),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync(
            "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            content
        );

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error creando la orden en PayPal: {error}");
        }

        var json = await response.Content.ReadAsStringAsync();
        return JsonDocument.Parse(json);
    }

    public async Task<JsonDocument> CaptureOrder(string orderId)
    {
        var token = await GetAccessToken();

        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        var response = await _httpClient.PostAsync(
            $"https://api-m.sandbox.paypal.com/v2/checkout/orders/{orderId}/capture",
            new StringContent("", Encoding.UTF8, "application/json")
        );

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error capturando la orden: {error}");
        }

        var json = await response.Content.ReadAsStringAsync();
        return JsonDocument.Parse(json);
    }
}