namespace Dh2Clinic.DevApi.Models.Dtos;

public class LoginOfficeDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Code { get; set; } = string.Empty;
  public string City { get; set; } = string.Empty;
  public string Status { get; set; } = "Active";
}
