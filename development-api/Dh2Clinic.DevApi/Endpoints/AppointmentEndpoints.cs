using Dh2Clinic.DevApi.Data;
using Dh2Clinic.DevApi.Models.Dtos;
using Dh2Clinic.DevApi.Models.Requests;

namespace Dh2Clinic.DevApi.Endpoints;

public static class AppointmentEndpoints
{
  public static IEndpointRouteBuilder MapAppointmentEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGet("/api/appointments", (MockDatabase db) =>
{
  return Results.Ok(new
  {
    Data = db.Appointments,
    Errors = Array.Empty<object>()
  });
});

    app.MapGet("/api/appointments/{id:int}", (int id, MockDatabase db) =>
    {
      var appointment = db.Appointments.FirstOrDefault(a => a.Id == id);

      if (appointment is null)
      {
        return Results.NotFound(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code = "NOT_FOUND",
                    Message = $"Appointment not found."
                }
                }
        });
      }

      return Results.Ok(new
      {
        Data = appointment,
        Errors = Array.Empty<object>()
      });
    });


    app.MapPost("/api/appointments",
    (CreateAppointmentRequest request, MockDatabase db) =>
    {
      var patient = db.Patients.FirstOrDefault(p => p.Id == request.PatientId);

      if (patient is null)
      {
        return Results.BadRequest(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code = "PATIENT_NOT_FOUND",
                    Message = "Patient not found."
                }
                }
        });
      }

      var appointment = new AppointmentDto
      {
        Id = db.Appointments.Max(a => a.Id) + 1,
        PatientId = request.PatientId,
        PatientName = $"{patient.FirstName} {patient.LastName}",
        AppointmentDate = request.AppointmentDate.ToString("yyyy-MM-dd HH:mm"),
        Status = request.Status
      };

      db.Appointments.Add(appointment);

      return Results.Ok(new
      {
        Data = appointment,
        Errors = Array.Empty<object>()
      });
    });

    app.MapPut("/api/appointments/{id:int}",
    (int id, UpdateAppointmentRequest request, MockDatabase db) =>
    {
      var appointment = db.Appointments.FirstOrDefault(a => a.Id == id);

      if (appointment is null)
      {
        return Results.NotFound();
      }

      var patient = db.Patients.FirstOrDefault(p => p.Id == request.PatientId);

      if (patient is null)
      {
        return Results.BadRequest(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code = "PATIENT_NOT_FOUND",
                    Message = "Patient not found."
                }
                }
        });
      }

      appointment.PatientId = request.PatientId;
      appointment.PatientName = $"{patient.FirstName} {patient.LastName}";
      appointment.AppointmentDate = request.AppointmentDate.ToString("yyyy-MM-dd HH:mm");
      appointment.Status = request.Status;

      return Results.Ok(new
      {
        Data = appointment,
        Errors = Array.Empty<object>()
      });
    });

    app.MapDelete("/api/appointments/{id:int}",
    (int id, MockDatabase db) =>
    {
      var appointment = db.Appointments.FirstOrDefault(a => a.Id == id);

      if (appointment is null)
      {
        return Results.NotFound(new
        {
          Data = (object?)null,
          Errors = new[]
            {
                new
                {
                    Code = "NOT_FOUND",
                    Message = "Appointment not found."
                }
                }
        });
      }

      db.Appointments.Remove(appointment);

      return Results.Ok(new
      {
        Data = true,
        Errors = Array.Empty<object>()
      });
    });



    return app;
  }
}
