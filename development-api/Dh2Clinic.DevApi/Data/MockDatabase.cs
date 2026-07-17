using Dh2Clinic.DevApi.Models.Dtos;

namespace Dh2Clinic.DevApi.Data;

public class MockDatabase
{
  public List<PatientDto> Patients { get; } =
  [
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
    ];

  public List<AppointmentDto> Appointments { get; } =
  [
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
  ];

  public List<LoginOfficeDto> LoginOffices { get; } =
  [
  new()
    {
        Id = 1,
        Name = "Helsinki Central",
        Code = "HEL001",
        City = "Helsinki",
        Status = "Active"
    },
    new()
    {
        Id = 2,
        Name = "Espoo Clinic",
        Code = "ESP001",
        City = "Espoo",
        Status = "Active"
    },
    new()
    {
        Id = 3,
        Name = "Tampere Office",
        Code = "TAM001",
        City = "Tampere",
        Status = "Inactive"
    }
  ];
}
