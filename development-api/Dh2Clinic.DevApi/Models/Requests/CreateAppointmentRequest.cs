namespace Dh2Clinic.DevApi.Models.Requests;
using System;
public record CreateAppointmentRequest(
    int PatientId,
    DateTime AppointmentDate,
    string Status);
