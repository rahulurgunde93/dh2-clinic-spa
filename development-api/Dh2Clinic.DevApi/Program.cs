var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

var patients = new List<PatientDto>
{
    new()
    {
        Id = 1,
        FirstName = "Matti",
        LastName = "Virtanen",
        Email = "matti@example.com",
        PhoneNumber = "0401234567",
        DateOfBirth = "1985-02-12",
        Status = "Active"
    },

    new()
    {
        Id = 2,
        FirstName = "Anna",
        LastName = "Korhonen",
        Email = "anna@example.com",
        PhoneNumber = "0407654321",
        DateOfBirth = "1990-07-05",
        Status = "Inactive"
    },

    new()
    {
        Id = 3,
        FirstName = "Erik",
        LastName = "Johansson",
        Email = "erik@example.com",
        PhoneNumber = "0409999999",
        DateOfBirth = "1988-11-21",
        Status = "Active"
    }
};

app.MapGet("/api/patients", () =>
{
  return Results.Ok(new
  {
    Data = patients,
    Errors = Array.Empty<object>()
  });
});

app.MapGet("/api/patients/{id:int}", (int id) =>
{
  var patient = patients.FirstOrDefault(x => x.Id == id);

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
  var filtered = patients
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

app.MapPost("/api/patients",
(CreatePatientRequest request) =>
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
    Id = patients.Max(x => x.Id) + 1,
    FirstName = request.FirstName,
    LastName = request.LastName,
    Email = request.Email,
    PhoneNumber = request.PhoneNumber,
    DateOfBirth = request.DateOfBirth,
    Status = request.Status
  };

  patients.Add(patient);

  return Results.Ok(new
  {
    Data = patient,
    Errors = Array.Empty<object>()
  });
});

app.MapPut("/api/patients/{id:int}",
(int id, UpdatePatientRequest request) =>
{
  var patient = patients.FirstOrDefault(x => x.Id == id);

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

app.Run();
record LoginRequest(string Username, string Password);
record CreatePatientRequest(string FirstName, string LastName, string Email, string PhoneNumber, string DateOfBirth, string Status);
record UpdatePatientRequest(int Id, string FirstName, string LastName, string Email, string PhoneNumber, string DateOfBirth, string Status);
record PatientDto
{
  public int Id { get; set; }
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  public string DateOfBirth { get; set; } = string.Empty;
  public string Status { get; set; } = "Active";
}
