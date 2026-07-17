using Dh2Clinic.DevApi.Data;
using Dh2Clinic.DevApi.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<MockDatabase>();

var app = builder.Build();

app.MapDashboardEndpoints();
app.MapPatientEndpoints();
app.MapAppointmentEndpoints();
app.MapLoginOfficeEndpoints();
app.MapAuthEndpoints();

app.Run();
