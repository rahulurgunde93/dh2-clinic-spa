namespace Dh2Clinic.DevApi.Models.Requests;
public record UpdateLoginOfficeRequest(
    int Id,
    string Name,
    string Code,
    string City,
    string Status
);
