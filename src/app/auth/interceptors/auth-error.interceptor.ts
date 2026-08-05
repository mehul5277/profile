import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Handle 401 Unauthorized error
        console.error('Unauthorized access - redirecting to login.');
        router.navigate(['/auth/sign-in']);
      } else if (error.status === 403) {
        // Handle 403 Forbidden error
        console.error('Forbidden access - you do not have permission to view this content.');
      }
      throw error;
    })
  );
};
