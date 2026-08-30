import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export interface UserState {
  token: string | null;
  role: 'USER' | 'ADMIN' | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Reactive token state using Angular Signals
  private authState = signal<UserState>({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role') as 'USER' | 'ADMIN' | null
  });

  //https://stackblitz.com/edit/angular-login-module?file=app%2Fapp.component.ts,app%2Fauth%2Fauth.service.ts
  // Inject the Angular Router service
  private router = inject(Router);
  // Use Angular Signals to track the current user state reactively
  currentUser = signal<any | null>(null);

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): 'USER' | 'ADMIN' | null {
    return this.authState().role;
  }

  getUserRoles(): string[] {
    //return this.authState().role;
    //return ['USER', 'ADMIN'];
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.roles;
    }
    return [];
  }

  login(username: string, password: string) {
    return this.http.post('/api/login', { username, password }).pipe(
      tap((response: any) => {
        console.log('Login successful:', response);
        // Automatically save token and user info on success
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      })
    );
  }

  logout(): void {

    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);

    // Redirect to the login page or any other route after logout
    this.router.navigate(['auth', 'sign-in']);// Adjust the path as needed

  }
}