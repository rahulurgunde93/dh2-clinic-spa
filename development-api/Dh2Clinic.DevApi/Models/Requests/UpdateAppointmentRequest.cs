namespace Dh2Clinic.DevApi.Models.Requests;
public record UpdateAppointmentRequest(
    int Id,
    int PatientId,
    DateTime AppointmentDate,
    string Status);
