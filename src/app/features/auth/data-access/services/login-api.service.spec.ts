import { TestBed } from '@angular/core/testing';

import { ApiService } from '../../../../core/services/api.service';
import { LoginApiService } from './login-api.service';

describe('LoginApiService', () => {
  let service: LoginApiService;

  const apiServiceMock = {
    post: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginApiService,
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
      ],
    });

    service = TestBed.inject(LoginApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
