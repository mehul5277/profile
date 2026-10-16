import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet, NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, NgClass],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
  private authService: AuthService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  isActive(route: string): boolean {
    return window.location.pathname === route;
  }
}
