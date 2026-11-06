import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-recruitment-navbar',
  standalone: true,
  imports: [RouterLink, MatIconModule, RouterLinkActive, NgTemplateOutlet, JsonPipe],
  templateUrl: './recruitment-navbar.component.html',
  styleUrl: './recruitment-navbar.component.scss'
})
export class RecruitmentNavbarComponent {

  platformDD = {
    "name": "Platform",
    "dropdown": [
      {
        "icon": "search",
        "name": "Sourcing",
        "description": "Find your next great hire",
        "url": "./sourcing"
      },
      {
        "icon": "check_circle",
        "name": "Application Review",
        "description": "Evaluate 100% of applicants",
        "url": "./review"
      },
      {
        "icon": "visibility",
        "name": "Screening",
        "description": "Talk to every candidate",
        "url": "./screening"
      },
      {
        "icon": "event",
        "name": "Notes",
        "description": "Interview notes done for you",
        "url": "./notes"
      },
      {
        "icon": "bar_chart",
        "name": "Reports",
        "description": "Structured data for your entire funnel",
        "url": "./reports"
      },
      {
        "icon": "auto_fix_high",
        "name": "fillmore",
        "description": "Recruiting that runs itself",
        "url": "./fillmore"
      }
    ]
  }
}
