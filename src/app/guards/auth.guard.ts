import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const token = localStorage.getItem('token');
  if (!token) {
    inject(Router).navigate(['auth', 'sign-in']); // Redirect to signin page if not authenticated
    return false;
  }
  return true;
};