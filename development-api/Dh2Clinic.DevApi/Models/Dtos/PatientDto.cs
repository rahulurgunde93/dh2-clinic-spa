namespace Dh2Clinic.DevApi.Models.Dtos;

public class PatientDto
{
  public int Id { get; set; }
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  public string DateOfBirth { get; set; } = string.Empty;
  public string Status { get; set; } = "Active";
}
