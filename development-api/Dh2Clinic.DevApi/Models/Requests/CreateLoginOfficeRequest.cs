namespace Dh2Clinic.DevApi.Models.Requests;
public record CreateLoginOfficeRequest(
    string Name,
    string Code,
    string City,
    string Status
);
