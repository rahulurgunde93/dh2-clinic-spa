namespace Dh2Clinic.DevApi.Models.Requests;

public record CreatePatientRequest(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string DateOfBirth,
    string Status
);
