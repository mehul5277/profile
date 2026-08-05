import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://stackblitz.com/edit/angular-login-module?file=app%2Fapp.component.ts,app%2Fauth%2Fauth.service.ts
  // Inject the Angular Router service
  private router = inject(Router);
  // Use Angular Signals to track the current user state reactively
  currentUser = signal<any | null>(null);

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post('/api/login', { username, password }).pipe(
      tap((response: any) => {
        // Automatically save token and user info on success
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['auth', 'sign-in']);
  }
}