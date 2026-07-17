using Dh2Clinic.DevApi.Data;
using Dh2Clinic.DevApi.Models.Dtos;
using Dh2Clinic.DevApi.Models.Requests;
namespace Dh2Clinic.DevApi.Endpoints;

public static class PatientEndpoints
{
  public static IEndpointRouteBuilder MapPatientEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGet("/api/patients", (MockDatabase db) =>
    {
      return Results.Ok(new
      {
        Data = db.Patients,
        Errors = Array.Empty<object>()
        });
     });

    app.MapGet("/api/patients/{id:int}", (int id, MockDatabase db) =>
    {
      var patient = db.Patients.FirstOrDefault(x => x.Id == id);

      if (patient is null)
      {
        return Results.NotFound(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code="NOT_FOUND",
                    Message="Patient not found."
                }
                }
        });
      }

      return Results.Ok(new
      {
        Data = patient,
        Errors = Array.Empty<object>()
      });
    });

    app.MapGet("/api/patients/search",
    (string query, MockDatabase db) =>
    {
      var filtered = db.Patients
      .Where(p =>
          $"{p.FirstName} {p.LastName}"
              .Contains(query, StringComparison.OrdinalIgnoreCase))
      .Select(p => new
            {
              p.Id,
              p.FirstName,
              p.LastName
            })
      .ToArray();

      return Results.Ok(new
      {
        Data = filtered,
        Errors = Array.Empty<object>()
      });
    });

    app.MapPost("/api/patients", (CreatePatientRequest request, MockDatabase db) =>
    {
      if (string.IsNullOrWhiteSpace(request.FirstName))
      {
        return Results.BadRequest(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code="FIRST_NAME_REQUIRED",
                    Message="First name is required."
                }
                }
        });
      }

      var patient = new PatientDto
      {
        Id = db.Patients.Max(x => x.Id) + 1,
        FirstName = request.FirstName,
        LastName = request.LastName,
        Email = request.Email,
        PhoneNumber = request.PhoneNumber,
        DateOfBirth = request.DateOfBirth,
        Status = request.Status
      };

      db.Patients.Add(patient);

      return Results.Ok(new
      {
        Data = patient,
        Errors = Array.Empty<object>()
      });
    });

    app.MapPut("/api/patients/{id:int}",
    (int id, UpdatePatientRequest request, MockDatabase db) =>
    {
      var patient = db.Patients.FirstOrDefault(x => x.Id == id);

      if (patient is null)
      {
        return Results.NotFound();
      }

      patient.FirstName = request.FirstName;
      patient.LastName = request.LastName;
      patient.Email = request.Email;
      patient.PhoneNumber = request.PhoneNumber;
      patient.DateOfBirth = request.DateOfBirth;
      patient.Status = request.Status;

      return Results.Ok(new
      {
        Data = patient,
        Errors = Array.Empty<object>()
      });
    });

    app.MapDelete("/api/patients/{id:int}",
    (int id, MockDatabase db) =>
    {
      var patient = db.Patients.FirstOrDefault(x => x.Id == id);

      if (patient is null)
      {
        return Results.NotFound(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code = "NOT_FOUND",
                    Message = "Patient not found."
                }
                }
        });
      }

      db.Patients.Remove(patient);

      return Results.Ok(new
      {
        Data = true,
        Errors = Array.Empty<object>()
      });
    });


    return app;
  }
}
