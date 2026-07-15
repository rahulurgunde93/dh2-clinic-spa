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

var appointments = new List<AppointmentDto>
{
    new()
    {
        Id = 1,
        PatientId = 1,
        PatientName = "Matti Virtanen",
        AppointmentDate = "2026-07-15 09:00",
        Status = "Scheduled"
    },
    new()
    {
        Id = 2,
        PatientId = 2,
        PatientName = "Anna Korhonen",
        AppointmentDate = "2026-07-15 10:00",
        Status = "Completed"
    },
    new()
    {
        Id = 3,
        PatientId = 3,
        PatientName = "Erik Johansson",
        AppointmentDate = "2026-07-16 14:30",
        Status = "Cancelled"
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
  return Results.Ok(new
  {
    Data = appointments,
    Errors = Array.Empty<object>()
  });
});

app.MapGet("/api/appointments/{id:int}", (int id) =>
{
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

app.MapPost("/api/appointments",
(CreateAppointmentRequest request) =>
{
  var patient = patients.FirstOrDefault(p => p.Id == request.PatientId);

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
    Id = appointments.Max(a => a.Id) + 1,
    PatientId = request.PatientId,
    PatientName = $"{patient.FirstName} {patient.LastName}",
    AppointmentDate = request.AppointmentDate.ToString("yyyy-MM-dd HH:mm"),
    Status = request.Status
  };

  appointments.Add(appointment);

  return Results.Ok(new
  {
    Data = appointment,
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

app.MapPut("/api/appointments/{id:int}",
(int id, UpdateAppointmentRequest request) =>
{
  var appointment = appointments.FirstOrDefault(a => a.Id == id);

  if (appointment is null)
  {
    return Results.NotFound();
  }

  var patient = patients.FirstOrDefault(p => p.Id == request.PatientId);

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

app.MapDelete("/api/patients/{id:int}",
(int id) =>
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
                    Code = "NOT_FOUND",
                    Message = "Patient not found."
                }
            }
    });
  }

  patients.Remove(patient);

  return Results.Ok(new
  {
    Data = true,
    Errors = Array.Empty<object>()
  });
});

app.MapDelete("/api/appointments/{id:int}",
(int id) =>
{
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
                    Code = "NOT_FOUND",
                    Message = "Appointment not found."
                }
            }
    });
  }

  appointments.Remove(appointment);

  return Results.Ok(new
  {
    Data = true,
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

record CreateAppointmentRequest(
    int PatientId,
    DateTime AppointmentDate,
    string Status);
record UpdateAppointmentRequest(
    int Id,
    int PatientId,
    DateTime AppointmentDate,
    string Status);
record AppointmentDto
{
  public int Id { get; set; }
  public int PatientId { get; set; }
  public string PatientName { get; set; } = string.Empty;
  public string AppointmentDate { get; set; } = string.Empty;
  public string Status { get; set; } = string.Empty;
}
