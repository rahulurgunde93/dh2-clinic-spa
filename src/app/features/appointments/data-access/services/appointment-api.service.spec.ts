import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { AppointmentApiService } from './appointment-api.service';

describe('AppointmentApiService', () => {
  let service: AppointmentApiService;

  let apiServiceMock: {
    get: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    apiServiceMock = {
      get: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AppointmentApiService,
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
      ],
    });

    service = TestBed.inject(AppointmentApiService);
  });

  it('should request appointments from the appointments endpoint', () => {
    const response = {
      data: [],
      errors: [],
    };

    apiServiceMock.get.mockReturnValue(of(response));

    service.getAppointments().subscribe((result) => {
      expect(result).toEqual(response);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('appointments');
  });

  it('should request an appointment by id', () => {
    const response = {
      data: null,
      errors: [],
    };

    apiServiceMock.get.mockReturnValue(of(response));

    service.getAppointment(1).subscribe((result) => {
      expect(result).toEqual(response);
    });

    expect(apiServiceMock.get).toHaveBeenCalledWith('appointments/1');
  });

});
