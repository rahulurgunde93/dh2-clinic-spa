import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should perform a GET request', () => {
    const response = {
      data: [{ id: 1 }],
      errors: [],
    };

    service.get<{ id: number }[]>('patients').subscribe((result) => {
      expect(result).toEqual(response);
    });

    const request = httpTestingController.expectOne('/api/patients');

    expect(request.request.method).toBe('GET');

    request.flush(response);
  });

  it('should perform a POST request', () => {
    const requestBody = {
      name: 'Test Patient',
    };

    const response = {
      data: {
        id: 1,
        name: 'Test Patient',
      },
      errors: [],
    };

    service
      .post<typeof requestBody, typeof response.data>('patients', requestBody)
      .subscribe((result) => {
        expect(result).toEqual(response);
      });

    const request = httpTestingController.expectOne('/api/patients');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(requestBody);

    request.flush(response);
  });
});
