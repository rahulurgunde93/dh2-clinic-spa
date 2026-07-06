var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/api/patients", () =>
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
    Data = patients,
    Errors = Array.Empty<object>()
  });
});

app.Run();
