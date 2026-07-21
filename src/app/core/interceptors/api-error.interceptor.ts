import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

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

  if (error.error?.errors?.length) {
    return error.error.errors[0].message;
  }

  if (error.error?.message) {
    return error.error.message;
  }

  return 'An unexpected error occurred.';
}
