import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApplicationError } from '../models/application-error.model';
import { apiErrorInterceptor } from './api-error.interceptor';

describe('apiErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should normalize a backend API error', () => {
    const backendError = {
      data: null,
      errors: [
        {
          code: 'PATIENT_NOT_FOUND',
          message: 'Patient was not found.',
        },
      ],
    };

    httpClient.get('/api/patients/1').subscribe({
      next: () => {
        throw new Error('Expected request to fail');
      },
      error: (error: ApplicationError) => {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Patient was not found.');
      },
    });

    const request = httpTestingController.expectOne('/api/patients/1');

    request.flush(backendError, {
      status: 404,
      statusText: 'Not Found',
    });
  });

  it('should normalize a network error', () => {
    httpClient.get('/api/patients').subscribe({
      next: () => {
        throw new Error('Expected request to fail');
      },
      error: (error: ApplicationError) => {
        expect(error.status).toBe(0);
        expect(error.message).toBe('Unable to connect to the server.');
      },
    });

    const request = httpTestingController.expectOne('/api/patients');

    request.error(new ProgressEvent('Network error'));
  });
});
