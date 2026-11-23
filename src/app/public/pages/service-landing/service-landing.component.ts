import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ALL_SERVICES_DETAIL,
  ServiceKey,
  ServiceOfferingDetail
} from './../../metadata/service-showcase.data';

@Component({
  selector: 'app-service-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-landing.component.html',
  styleUrls: ['./service-landing.component.scss']
})
export class ServiceLandingComponent implements OnInit {
  @Input() serviceSlug?: ServiceKey;

  services: ServiceOfferingDetail[] = ALL_SERVICES_DETAIL;
  activeService: ServiceOfferingDetail = ALL_SERVICES_DETAIL[1]; // Default: AI & Automation

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 1. Apply embedded @Input() if provided
    if (this.serviceSlug) {
      this.selectService(this.serviceSlug);
    }

    // 2. Sync active service when navigating to /services/:slug
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') as ServiceKey | null;
      if (slug) {
        this.selectService(slug);
      }
    });
  }

  selectService(key: ServiceKey): void {
    const match = this.services.find((s) => s.key === key);
    if (match) {
      this.activeService = match;
    }
  }
}