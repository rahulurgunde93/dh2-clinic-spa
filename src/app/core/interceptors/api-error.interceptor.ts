import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HTTP_STATUS } from '../constants/http-status.constants';
import { ApplicationError } from '../models/application-error.model';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const applicationError: ApplicationError = {
        status: error.status,
        message: getErrorMessage(error),
      };

      return throwError(() => applicationError);
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Unable to connect to the server.';
  }

  return (
    error.error?.errors?.[0]?.message ??
    error.error?.message ??
    error.message ??
    'An unexpected error occurred.'
  );
}
