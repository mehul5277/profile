import { Component, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //https://this-is-angular.github.io/angular-guides/docs/fundamentals/angular-components
  title = 'profile';

  ngOnInit(): void {
    isDevMode() ? console.log('Running in development mode') : console.log('Running in production mode');
  }

  isDevelopmentMode(): boolean {
    console.log('isDevMode:', isDevMode());
    return isDevMode();
  }
}
