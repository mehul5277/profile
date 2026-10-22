import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [],
  templateUrl: './company-page.component.html',
  styleUrl: './company-page.component.scss'
})
export class CompanyPageComponent {
  id = input<string>();
  private router = inject(Router);
  linkedIn = `https://www.linkedin.com/in/mehul4ca`;
}
