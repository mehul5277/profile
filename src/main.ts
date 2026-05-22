import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import Clarity from '@microsoft/clarity';

// Replace with your actual project ID
const clarityId = "wuwlr4ugmv";

// Optional: Only run in production environment
// if (environment.production) { ... }
Clarity.init(clarityId);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


if (environment.production) {
  Clarity.event("custom-production-event");
  window.console.log = () => { };
}