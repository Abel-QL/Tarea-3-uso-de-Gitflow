import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authHeader = authService.getAuthHeader();

  const apiUrl = 'http://localhost:8080';
  if (authHeader && req.url.startsWith(apiUrl) && !req.url.includes('/api/auth/login')) {
    req = req.clone({ setHeaders: { Authorization: authHeader } });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 && !req.url.includes('/api/auth/login')) {
        authService.logout();
      }
      return throwError(() => err);
    })
  );
};
