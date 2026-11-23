import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ServiceCaseStudy,
  ServiceKey,
  ServiceOfferingDetail
} from './../../public/metadata/service-showcase.data';
import {
  ServicesCatalogResponse,
  ServicesCatalogService
} from './../../public/services/services-catalog.service';

export interface AdminOperationResult {
  ok: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesCatalogAdminService {
  constructor(private readonly catalogService: ServicesCatalogService) {}

  getDraftClone(): ServicesCatalogResponse {
    return this.clone(this.catalogService.getCurrentCatalog());
  }

  saveDraft(draft: ServicesCatalogResponse): AdminOperationResult {
    const validationError = this.validateCatalog(draft);
    if (validationError) {
      return { ok: false, error: validationError };
    }

    this.catalogService.saveCatalog(this.clone(draft));
    return {
      ok: true,
      message: 'Saved catalog changes and updated live catalog state.'
    };
  }

  resetToDefault(): Observable<ServicesCatalogResponse> {
    return this.catalogService.resetToDefaultFromAsset();
  }

  addService(draft: ServicesCatalogResponse): {
    catalog: ServicesCatalogResponse;
    selectedIndex: number;
    message: string;
  } {
    const nextCatalog = this.clone(draft);
    const index = nextCatalog.services.length + 1;
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

    nextCatalog.services.push(newService);
    return {
      catalog: nextCatalog,
      selectedIndex: nextCatalog.services.length - 1,
      message: `Added "${newService.navLabel}". Click "Save Catalog" to persist.`
    };
  }

  duplicateService(
    draft: ServicesCatalogResponse,
    index: number
  ): {
    catalog: ServicesCatalogResponse;
    selectedIndex: number;
    message?: string;
    error?: string;
  } {
    const source = draft.services[index];
    if (!source) {
      return {
        catalog: draft,
        selectedIndex: index,
        error: 'Selected service was not found.'
      };
    }

    const nextCatalog = this.clone(draft);
    const copy = this.clone(source);
    copy.navLabel = `${source.navLabel} Copy`;
    copy.headline = `${source.headline} (Copy)`;

    nextCatalog.services.splice(index + 1, 0, copy);
    return {
      catalog: nextCatalog,
      selectedIndex: index + 1,
      message: `Duplicated "${source.navLabel}". Click "Save Catalog" to persist.`
    };
  }

  removeService(
    draft: ServicesCatalogResponse,
    index: number
  ): {
    catalog: ServicesCatalogResponse;
    selectedIndex: number;
    message?: string;
    error?: string;
  } {
    if (draft.services.length <= 1) {
      return {
        catalog: draft,
        selectedIndex: index,
        error: 'At least one service must remain in the catalog.'
      };
    }

    const nextCatalog = this.clone(draft);
    const removed = nextCatalog.services[index];
    if (!removed) {
      return {
        catalog: draft,
        selectedIndex: index,
        error: 'Selected service was not found.'
      };
    }

    nextCatalog.services.splice(index, 1);
    const nextIndex = Math.max(0, Math.min(index, nextCatalog.services.length - 1));

    return {
      catalog: nextCatalog,
      selectedIndex: nextIndex,
      message: `Removed "${removed.navLabel}". Click "Save Catalog" to persist.`
    };
  }

  addListItem(list: string[], placeholder: string): void {
    list.push(placeholder);
  }

  removeListItem(list: string[], index: number): void {
    list.splice(index, 1);
  }

  addSmartItem(service: ServiceOfferingDetail): void {
    service.howWeOperateSmartly.push({
      title: 'New Smart Practice',
      detail: 'Describe how we automate, standardize, or optimize this area.'
    });
  }

  removeSmartItem(service: ServiceOfferingDetail, index: number): void {
    service.howWeOperateSmartly.splice(index, 1);
  }

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

  stringifyCatalog(catalog: ServicesCatalogResponse): string {
    return JSON.stringify(catalog, null, 2);
  }

  parseAndFormatJson(jsonText: string): {
    catalog?: ServicesCatalogResponse;
    formatted?: string;
    error?: string;
  } {
    try {
      const parsed = JSON.parse(jsonText) as ServicesCatalogResponse;
      const validationError = this.validateCatalog(parsed);
      if (validationError) {
        return { error: validationError };
      }
      return {
        catalog: parsed,
        formatted: JSON.stringify(parsed, null, 2)
      };
    } catch (err) {
      return {
        error: `Invalid JSON: ${(err as Error).message}`
      };
    }
  }

  downloadJson(catalog: ServicesCatalogResponse): void {
    this.catalogService.downloadCatalogJson(catalog);
  }

  private validateCatalog(catalog: ServicesCatalogResponse): string | null {
    if (!catalog || typeof catalog !== 'object' || !Array.isArray(catalog.services)) {
      return 'JSON root must be an object containing a "services" array.';
    }
    if (catalog.services.length === 0) {
      return 'Catalog must include at least one service.';
    }
    return null;
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}