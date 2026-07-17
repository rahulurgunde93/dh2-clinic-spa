using Dh2Clinic.DevApi.Models.Requests;

namespace Dh2Clinic.DevApi.Endpoints;

public static class AuthEndpoints
{
  public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
  {

    app.MapGet("/api/auth/me", () =>
    {
      return Results.Ok(new
      {
        Data = new
        {
          Id = 1,
          Username = "rahul",
          DisplayName = "Rahul Urgunde",
          Role = "Administrator"
        },
        Errors = Array.Empty<object>()
      });
    });

    app.MapPost("/api/auth/login", async (LoginRequest request) =>
    {
      if (request.Username != "admin" ||
          request.Password != "admin")
      {
        return Results.Unauthorized();
      }

      return Results.Ok(new
      {
        Data = new
        {
          Token = "mock-jwt-token",
          ExpiresAt = DateTime.UtcNow.AddHours(8),
          User = new
          {
            Id = 1,
            Username = "admin",
            FullName = "DH2 Administrator",
            Role = "Administrator"
          }
        },
        Errors = Array.Empty<object>()
      });
    });

    app.MapPost("/api/auth/logout", () =>
    {
      return Results.Ok(new
      {
        Data = true,
        Errors = Array.Empty<object>()
      });
    });


    return app;
  }
}
