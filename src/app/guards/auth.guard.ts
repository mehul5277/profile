import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const authService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    inject(Router).navigate(['auth', 'sign-in']);
    return false;
  }
  return true;
};