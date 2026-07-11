var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/api/patients", async () =>
{
  var patients = new[]
  {
        new
        {
            Id = 1,
            FirstName = "Matti",
            LastName = "Virtanen"
        },
        new
        {
            Id = 2,
            FirstName = "Anna",
            LastName = "Korhonen"
        },
        new
        {
            Id = 3,
            FirstName = "Erik",
            LastName = "Johansson"
        }
    };

  return Results.Ok(new
  {
    Data =  patients,
    Errors = Array.Empty<object>()
  });
});

app.MapGet("/api/patients/{id:int}", async (int id) =>
{
  var patients = new[]
  {
        new
        {
            Id = 1,
            FirstName = "Matti",
            LastName = "Virtanen"
        },
        new
        {
            Id = 2,
            FirstName = "Anna",
            LastName = "Korhonen"
        },
        new
        {
            Id = 3,
            FirstName = "Erik",
            LastName = "Johansson"
        }
    };

  var patient = patients.FirstOrDefault(p => p.Id == id);

  if (patient is null)
  {
    return Results.NotFound(new
    {
      Data = (object?)null,
      Errors = new[]
        {
                new
                {
                    Code = "PATIENT_NOT_FOUND",
                    Message = $"Patient with id {id} was not found."
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

app.MapGet("/api/appointments", () =>
{
  var appointments = new[]
  {
        new
        {
            Id = 1,
            PatientId = 1,
            PatientName = "Matti Virtanen",
            AppointmentDate = "2026-07-15 09:00",
            Status = "Scheduled"
        },
        new
        {
            Id = 2,
            PatientId = 2,
            PatientName = "Anna Korhonen",
            AppointmentDate = "2026-07-15 10:00",
            Status = "Completed"
        },
        new
        {
            Id = 3,
            PatientId = 3,
            PatientName = "Erik Johansson",
            AppointmentDate = "2026-07-16 14:30",
            Status = "Cancelled"
        }
    };

  return Results.Ok(new
  {
    Data = appointments,
    Errors = Array.Empty<object>()
  });
});

app.MapGet("/api/appointments/{id:int}", (int id) =>
{
  var appointments = new[]
  {
        new
        {
            Id = 1,
            PatientId = 1,
            PatientName = "Matti Virtanen",
            AppointmentDate = "2026-07-15 09:00",
            Status = "Scheduled"
        },
        new
        {
            Id = 2,
            PatientId = 2,
            PatientName = "Anna Korhonen",
            AppointmentDate = "2026-07-15 10:00",
            Status = "Completed"
        },
        new
        {
            Id = 3,
            PatientId = 3,
            PatientName = "Erik Johansson",
            AppointmentDate = "2026-07-16 14:30",
            Status = "Cancelled"
        }
    };

  var appointment = appointments.FirstOrDefault(a => a.Id == id);

  if (appointment is null)
  {
    return Results.NotFound(new
    {
      Data = (object?)null,
      Errors = new[]
        {
                new
                {
                    Code = "APPOINTMENT_NOT_FOUND",
                    Message = $"Appointment with id {id} was not found."
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

app.MapPost("/api/auth/logout", () =>
{
  return Results.Ok(new
  {
    Data = true,
    Errors = Array.Empty<object>()
  });
});

app.MapGet("/api/patients/search", (string query) =>
{
  var patients = new[]
  {
        new { Id = 1, FirstName = "Matti", LastName = "Virtanen" },
        new { Id = 2, FirstName = "Anna", LastName = "Korhonen" },
        new { Id = 3, FirstName = "Erik", LastName = "Johansson" }
    };

  var filtered = patients
      .Where(p =>
          $"{p.FirstName} {p.LastName}"
              .Contains(query, StringComparison.OrdinalIgnoreCase))
      .ToArray();

  return Results.Ok(new
  {
    Data = filtered,
    Errors = Array.Empty<object>()
  });
});

app.Run();
record LoginRequest(string Username, string Password);

