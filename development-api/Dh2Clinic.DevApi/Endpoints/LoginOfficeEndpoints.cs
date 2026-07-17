using Dh2Clinic.DevApi.Data;
using Dh2Clinic.DevApi.Models.Dtos;
using Dh2Clinic.DevApi.Models.Requests;

namespace Dh2Clinic.DevApi.Endpoints;

public static class LoginOfficeEndpoints
{
  public static IEndpointRouteBuilder MapLoginOfficeEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGet("/api/login-offices", (MockDatabase db) =>
{
  return Results.Ok(new
  {
    Data = db.LoginOffices,
    Errors = Array.Empty<object>()
  });
});

    app.MapPost("/api/login-offices", (CreateLoginOfficeRequest request, MockDatabase db) =>
    {
      var office = new LoginOfficeDto
      {
        Id = db.LoginOffices.Max(x => x.Id) + 1,
        Name = request.Name,
        Code = request.Code,
        City = request.City,
        Status = request.Status
      };

      db.LoginOffices.Add(office);

      return Results.Ok(new
      {
        Data = office,
        Errors = Array.Empty<object>()
      });
    });

    app.MapPut("/api/login-offices/{id:int}",
    (int id, UpdateLoginOfficeRequest request, MockDatabase db) =>
    {
      var office = db.LoginOffices.FirstOrDefault(x => x.Id == id);

      if (office is null)
      {
        return Results.NotFound(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code = "NOT_FOUND",
                    Message = "Login office not found."
                }
                }
        });
      }

      office.Name = request.Name;
      office.Code = request.Code;
      office.City = request.City;
      office.Status = request.Status;

      return Results.Ok(new
      {
        Data = office,
        Errors = Array.Empty<object>()
      });
    });

    app.MapDelete("/api/login-offices/{id:int}",
    (int id, MockDatabase db) =>
    {
      var office = db.LoginOffices.FirstOrDefault(x => x.Id == id);

      if (office is null)
      {
        return Results.NotFound(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code = "NOT_FOUND",
                    Message = "Login office not found."
                }
                }
        });
      }

      db.LoginOffices.Remove(office);

      return Results.Ok(new
      {
        Data = true,
        Errors = Array.Empty<object>()
      });
    });

    return app;
  }
}
