import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ThemeMode, ThemeService } from '../../services/theme.service';
import { PreventCloseDirective } from '../../shared/directives/prevent-close.directive';

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, SlicePipe, PreventCloseDirective],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.scss'
})
export class PublicNavbarComponent implements OnInit {
  themeService = inject(ThemeService);
  private dataService = inject(DataService);
  private authService = inject(AuthService);
  isNavOpen = false;       // Mobile burger menu state
  isDropdownOpen = false;  // Theme selector state

  servicesMenu: Array<any> = [];
  IndustriesMenu: Array<any> = [];
  AboutusMenu: Array<any> = [];

  ngOnInit(): void {
    this.dataService.getData("services_menu").subscribe(data => this.servicesMenu = data);
    this.dataService.getData("industries_menu").subscribe(data => this.IndustriesMenu = data);
    this.dataService.getData("company_menu").subscribe(data => this.AboutusMenu = data);
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

  isActive(route: string): boolean {
    return window.location.pathname === route || window.location.hash === '#/' + route;
  }
}