import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from "../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  appConfig = {
    brand: "JIXO",
  };
  form: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  private returnUrl: string | null = '/';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    const q = this.route.snapshot.queryParams['returnUrl'];
    this.returnUrl = q || '/';
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    // If needed, revoke prompt or cleanup — google.accounts doesn't provide a destroy method for the button
  }

  private handleCredentialResponse(resp: any) {
    // debugger;
    // const idToken = resp && resp.credential;
    // if (!idToken) {
    //   return;
    // }
    // this.loading = true;
    // this.auth.loginWithGoogle(idToken).subscribe(ok => {
    //   this.loading = false;
    //   if (ok) {
    //     const target = this.determineRedirect();
    //     this.router.navigateByUrl(target);
    //   } else {
    //     this.error = 'Google sign-in failed';
    //   }
    // }, () => {
    //   this.loading = false;
    //   this.error = 'Network error during Google sign-in';
    // });
  }

  submit() {
    this.errorMessage = null;
    if (this.form.invalid) {
      this.errorMessage = 'Please provide username and password.';
      return;
    }
    this.loading = true;
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: ((ok) => {
        this.loading = false;
        debugger;
        if (ok) {
          const target = this.determineRedirect();
          this.router.navigateByUrl(target);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      }),
      error: (error: any) => {
        this.loading = false;
        if (error.status === 0) {
          // Status 0 indicates a network error or blocked request
          this.errorMessage = 'Network error. Please check your internet connection or server status.';
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
          this.router.navigate(['/login']); // Redirect to login
        } else if (error.status === 403) {
          this.errorMessage = 'You do not have permission to view this content.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      },
      complete: () => {
        debugger;
        this.loading = false;
      }
    });
  }

  private determineRedirect(): string {
    // If returnUrl was provided and is not the default root, honor it.
    if (this.returnUrl && this.returnUrl !== '/' && this.returnUrl !== '') {
      return this.returnUrl;
    }

    // try {
    //   const roles = this.auth.getUserRoles() || [];
    //   if (roles.includes('admin')) return '/admin';
    //   if (roles.includes('user')) return '/user';
    //   if (this.auth.isLoggedIn()) return '/home';
    // } catch {
    //   return '/public';
    // }

    return '/';
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  login(): void {
    this.authService.login('admin', 'password123').subscribe((response: any) => {
      debugger;
      // Store the token in local storage 
      localStorage.setItem('token', response.token);
      this.router.navigate(['/admin']); // Navigate to the admin dashboard or any other route after successful login
    })
  }

  setdefaultCredentials(): void {
    this.form.patchValue({
      username: 'admin',
      password: 'password123'
    });
  }
}