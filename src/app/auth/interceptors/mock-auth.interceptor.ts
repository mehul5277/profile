import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';

export const MockAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  // Hardcoded mock user database
  const mockUser = {
    username: 'admin',
    password: 'password123',
    token: 'fake-jwt-token-xyz789',
    roles: ['admin']
  };

  // Intercept only the login endpoint
  if (req.url.endsWith('/api/login') && req.method === 'POST') {
    const { username, password } = req.body;

    if (username === mockUser.username && password === mockUser.password) {
      const response = {
        token: mockUser.token,
        user: { username: mockUser.username, roles: mockUser.roles }
      };
      //return next(req.clone({ body: response }));

      return of(new HttpResponse({ body: response, status: 200 })).pipe(delay(1000)); // Simulate 500ms network lag;
    }

    // Return a 401 error for invalid credentials
    return throwError(() => new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      error: { message: 'Invalid username or password' }
    }));
  }

  return next(req);
};
