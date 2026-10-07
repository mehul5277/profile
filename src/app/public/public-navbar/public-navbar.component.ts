import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ThemeMode, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, SlicePipe],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.scss'
})
export class PublicNavbarComponent implements OnInit {
  themeService = inject(ThemeService);
  private dataService = inject(DataService);
  private authService = inject(AuthService);
  isNavOpen = false;       // Mobile burger menu state
  isDropdownOpen = false;  // Theme selector state

  services: any;

  ngOnInit(): void {
    this.dataService.getData("services").subscribe(data => this.services = data);
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeTheme(mode: ThemeMode): void {
    this.themeService.setTheme(mode);
    this.isDropdownOpen = false; // Collapse panel on choice
  }
}