namespace Dh2Clinic.DevApi.Models.Dtos;

public class AppointmentDto
{
  public int Id { get; set; }
  public int PatientId { get; set; }
  public string PatientName { get; set; } = string.Empty;
  public string AppointmentDate { get; set; } = string.Empty;
  public string Status { get; set; } = string.Empty;
}
