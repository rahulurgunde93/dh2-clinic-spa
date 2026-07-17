using Dh2Clinic.DevApi.Data;

namespace Dh2Clinic.DevApi.Endpoints;
public static class DashboardEndpoints
{
  public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGet("/api/dashboard", (MockDatabase db) =>
{
  var statistics = new[]
  {
        new
        {
            Title = "Patients",
            Value = db.Patients.Count,
            Icon = "groups"
        },
        new
        {
            Title = "Appointments",
            Value = db.Appointments.Count,
            Icon = "calendar_month"
        },
        new
        {
            Title = "Doctors",
            Value = 12,
            Icon = "badge"
        },
        new
        {
            Title = "Clinics",
            Value = 3,
            Icon = "local_hospital"
        }
    };

  var activities = new[]
  {
        new
        {
            Title = "New Patient",
            Description = "Anna Korhonen was registered.",
            Timestamp = "Today, 09:15",
            Icon = "person_add"
        },
        new
        {
            Title = "Appointment Scheduled",
            Description = "Appointment booked for Matti Virtanen.",
            Timestamp = "Today, 10:30",
            Icon = "event_available"
        },
        new
        {
            Title = "Patient Updated",
            Description = "Patient contact information updated.",
            Timestamp = "Yesterday",
            Icon = "edit"
        },
        new
        {
            Title = "Appointment Completed",
            Description = "Consultation completed successfully.",
            Timestamp = "Yesterday",
            Icon = "check_circle"
        }
    };

  return Results.Ok(new
  {
    Data = new
    {
      Statistics = statistics,
      Activities = activities
    },
    Errors = Array.Empty<object>()
  });
});


    return app;
  }
}
