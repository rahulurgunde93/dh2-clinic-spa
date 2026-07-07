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
    Data = Array.Empty<object>(),
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

app.Run();
