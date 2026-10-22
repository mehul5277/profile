import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ThemeMode, ThemeService } from '../../services/theme.service';
import { PreventCloseDirective } from '../../shared/directives/prevent-close.directive';

interface MegaMenuData {
  category: string;
  services: Array<Service>;
}

interface Service {
  name: string;
  url: string | Array<string>;
  icon: any;
  description: string;
}

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

  servicesMenu: Array<MegaMenuData> = [];
  IndustriesMenu: Array<any> = [];
  CompanyMenu: Array<MegaMenuData> = [];

  activeCategory: any;
  ngOnInit(): void {
    this.dataService.getData("services_menu").subscribe(data => {
      data.forEach((item: any) => {
        item.services.forEach((service: any) => {
          service.url = ["service", service.name];
        });
      });

      this.servicesMenu = data;
      // Automatically set the first category as active on load
      if (this.servicesMenu.length > 0) {
        this.activeCategory = this.servicesMenu[0].category;
      }
    });
    this.dataService.getData("industries_menu").subscribe(data => this.IndustriesMenu = data);
    this.dataService.getData("company_menu").subscribe(data => this.CompanyMenu = data);


  }

  selectCategory(categoryName: string): void {
    this.activeCategory = categoryName;
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