import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  SERVICE_LANDING_PAGES,
  ServiceLandingConfig
} from './../../metadata/service-landing.data';

@Component({
  selector: 'app-service-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-landing.component.html',
  styleUrls: ['./service-landing.component.scss']
})
export class ServiceLandingComponent implements OnInit {
  @Input() serviceSlug?: ServiceLandingConfig['slug'];

  allServices: ServiceLandingConfig[] = Object.values(SERVICE_LANDING_PAGES);
  activeService: ServiceLandingConfig = SERVICE_LANDING_PAGES['ai-automation'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.serviceSlug && SERVICE_LANDING_PAGES[this.serviceSlug]) {
      this.activeService = SERVICE_LANDING_PAGES[this.serviceSlug];
    }

    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') as ServiceLandingConfig['slug'] | null;
      if (slug && SERVICE_LANDING_PAGES[slug]) {
        this.activeService = SERVICE_LANDING_PAGES[slug];
      }
    });
  }

  selectService(slug: ServiceLandingConfig['slug']): void {
    this.activeService = SERVICE_LANDING_PAGES[slug];
  }
}