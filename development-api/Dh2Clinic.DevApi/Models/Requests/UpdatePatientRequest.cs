namespace Dh2Clinic.DevApi.Models.Requests;

public record UpdatePatientRequest(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string DateOfBirth,
    string Status
);
