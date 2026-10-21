import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  id = input<string>();
  private router = inject(Router);

  goToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
