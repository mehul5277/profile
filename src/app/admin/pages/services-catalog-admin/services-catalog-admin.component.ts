import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ServicesCatalogResponse, ServicesCatalogService } from '../../../public/services/services-catalog.service';
import { ServiceCaseStudy, ServiceKey, ServiceOfferingDetail } from '../../../public/metadata/service-showcase.data';


@Component({
  selector: 'app-services-catalog-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './services-catalog-admin.component.html',
  styleUrls: ['./services-catalog-admin.component.scss']
})
export class ServicesCatalogAdminComponent implements OnInit, OnDestroy {
  catalog: ServicesCatalogResponse = {
    brand: 'JIXO',
    tagline: 'Journey In eXponential Optimization',
    services: []
  };

  selectedIndex = 0;
  editorMode: 'form' | 'json' = 'form';
  jsonText = '';
  errorMessage = '';
  statusMessage = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private catalogService: ServicesCatalogService) {}

  ngOnInit(): void {
    this.catalogService.catalog$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.catalog = this.cloneCatalog(data);
        if (this.selectedIndex >= this.catalog.services.length) {
          this.selectedIndex = Math.max(0, this.catalog.services.length - 1);
        }
        this.jsonText = JSON.stringify(this.catalog, null, 2);
      });

    this.catalogService.loadCatalog()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get activeService(): ServiceOfferingDetail | undefined {
    return this.catalog.services[this.selectedIndex];
  }

  setMode(mode: 'form' | 'json'): void {
    this.clearAlerts();
    if (mode === 'json') {
      this.jsonText = JSON.stringify(this.catalog, null, 2);
    } else if (this.editorMode === 'json') {
      const parsed = this.parseJsonText();
      if (!parsed) {
        return;
      }
      this.catalog = parsed;
    }
    this.editorMode = mode;
  }

  selectService(index: number): void {
    this.clearAlerts();
    this.selectedIndex = index;
  }

  addService(): void {
    this.clearAlerts();
    const index = this.catalog.services.length + 1;
    const slug = `custom-service-${index}` as ServiceKey;

    const newService: ServiceOfferingDetail = {
      key: slug,
      navLabel: `New Service ${index}`,
      icon: 'layers',
      exploreUrl: `http://localhost:4200/#/services/${slug}`,
      badge: 'NEW PRACTICE',
      headline: `New Service Headline ${index}`,
      overview: 'Concise overview of this service offering.',
      introduction: 'Detailed introduction explaining context and business value.',
      benefits: ['Measurable operational impact', 'Scalable enterprise execution'],
      howWeCanHelp: ['Assess current state and design target architecture'],
      howWeOperateSmartly: [
        {
          title: 'Reusable Patterns',
          detail: 'Standardize repeatable building blocks to speed up delivery.'
        }
      ],
      caseStudies: [
        {
          sector: 'Enterprise',
          title: 'Sample Engagement Case Study',
          challenge: 'Legacy workflow bottleneck slowed execution.',
          solution: 'Implemented standardized, automated solution.',
          outcome: 'Improved speed and reliability.'
        }
      ],
      relatedUrl: 'http://localhost:4200/#/service',
      relatedLabel: 'Explore services'
    };

    this.catalog.services.push(newService);
    this.selectedIndex = this.catalog.services.length - 1;
    this.jsonText = JSON.stringify(this.catalog, null, 2);
    this.statusMessage = `Added "${newService.navLabel}". Click "Save Catalog" to persist.`;
  }

  duplicateService(index: number): void {
    this.clearAlerts();
    const source = this.catalog.services[index];
    if (!source) {
      return;
    }

    const copy = this.cloneCatalog(source);
    copy.navLabel = `${source.navLabel} Copy`;
    copy.headline = `${source.headline} (Copy)`;

    this.catalog.services.splice(index + 1, 0, copy);
    this.selectedIndex = index + 1;
    this.jsonText = JSON.stringify(this.catalog, null, 2);
    this.statusMessage = `Duplicated "${source.navLabel}". Click "Save Catalog" to persist.`;
  }

  removeService(index: number): void {
    this.clearAlerts();
    if (this.catalog.services.length <= 1) {
      this.errorMessage = 'At least one service must remain in the catalog.';
      return;
    }

    const removed = this.catalog.services[index];
    this.catalog.services.splice(index, 1);
    this.selectedIndex = Math.max(0, Math.min(index, this.catalog.services.length - 1));
    this.jsonText = JSON.stringify(this.catalog, null, 2);
    this.statusMessage = `Removed "${removed.navLabel}". Click "Save Catalog" to persist.`;
  }

  // String list helpers (benefits, howWeCanHelp)
  trackByIndex(index: number): number {
    return index;
  }

  addStringItem(list: string[], placeholder: string): void {
    list.push(placeholder);
  }

  removeStringItem(list: string[], index: number): void {
    list.splice(index, 1);
  }

  // Smart operating item helpers
  addSmartItem(service: ServiceOfferingDetail): void {
    service.howWeOperateSmartly.push({
      title: 'New Smart Practice',
      detail: 'Describe how we automate, standardize, or optimize this area.'
    });
  }

  removeSmartItem(service: ServiceOfferingDetail, index: number): void {
    service.howWeOperateSmartly.splice(index, 1);
  }

  // Case study helpers
  addCaseStudy(service: ServiceOfferingDetail): void {
    const study: ServiceCaseStudy = {
      sector: 'Enterprise',
      title: 'New Case Study',
      challenge: 'Describe the client challenge.',
      solution: 'Describe the solution delivered.',
      outcome: 'Describe the measurable outcome.'
    };
    service.caseStudies.push(study);
  }

  removeCaseStudy(service: ServiceOfferingDetail, index: number): void {
    service.caseStudies.splice(index, 1);
  }

  formatJson(): void {
    this.clearAlerts();
    const parsed = this.parseJsonText();
    if (!parsed) {
      return;
    }
    this.jsonText = JSON.stringify(parsed, null, 2);
    this.statusMessage = 'Formatted JSON successfully.';
  }

  saveCatalog(): void {
    this.clearAlerts();
    let payload: ServicesCatalogResponse | null = this.catalog;

    if (this.editorMode === 'json') {
      payload = this.parseJsonText();
      if (!payload) {
        return;
      }
      this.catalog = payload;
    }

    if (!Array.isArray(payload.services) || payload.services.length === 0) {
      this.errorMessage = 'Catalog must include at least one service.';
      return;
    }

    this.catalogService.saveCatalog(this.cloneCatalog(payload));
    this.jsonText = JSON.stringify(this.catalog, null, 2);
    this.statusMessage = 'Saved catalog changes to storage and updated live catalog state.';
  }

  resetDefault(): void {
    this.clearAlerts();
    this.catalogService.resetToDefaultFromAsset()
      .pipe(takeUntil(this.destroy$))
      .subscribe((restored) => {
        this.catalog = this.cloneCatalog(restored);
        this.selectedIndex = 0;
        this.jsonText = JSON.stringify(this.catalog, null, 2);
        this.statusMessage = 'Reset catalog to default configuration.';
      });
  }

  downloadJson(): void {
    this.clearAlerts();
    if (this.editorMode === 'json') {
      const parsed = this.parseJsonText();
      if (!parsed) {
        return;
      }
      this.catalogService.downloadCatalogJson(parsed);
    } else {
      this.catalogService.downloadCatalogJson(this.catalog);
    }
    this.statusMessage = 'Downloaded services-catalog.json.';
  }

  private parseJsonText(): ServicesCatalogResponse | null {
    try {
      const parsed = JSON.parse(this.jsonText) as ServicesCatalogResponse;
      if (!parsed || !Array.isArray(parsed.services)) {
        this.errorMessage = 'JSON root must be an object containing a "services" array.';
        return null;
      }
      return parsed;
    } catch (err) {
      this.errorMessage = `Invalid JSON: ${(err as Error).message}`;
      return null;
    }
  }

  private cloneCatalog<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }

  private clearAlerts(): void {
    this.errorMessage = '';
    this.statusMessage = '';
  }
}