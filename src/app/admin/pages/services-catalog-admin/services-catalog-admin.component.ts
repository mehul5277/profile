import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ServicesCatalogResponse, ServicesCatalogService } from '../../../public/services/services-catalog.service';
import { ServiceCaseStudy, ServiceKey, ServiceOfferingDetail } from '../../../public/metadata/service-showcase.data';
import { ServicesCatalogAdminService } from '../../services/services-catalog-admin.service';


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

  readonly iconPresets: string[] = [
    'database',
    'memory',
    'cloud',
    'code_xml',
    'headset_mic',
    'layers',
    'auto_awesome',
    'hub',
    'shield',
    'analytics'
  ];

  selectedIndex = 0;
  editorMode: 'form' | 'json' = 'form';
  jsonText = '';
  errorMessage = '';
  statusMessage = '';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly catalogService: ServicesCatalogService,
    private readonly adminService: ServicesCatalogAdminService
  ) {}

  ngOnInit(): void {
    this.catalogService.catalog$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.syncFromService();
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

  trackByIndex(index: number): number {
    return index;
  }

  applyIconPreset(service: ServiceOfferingDetail, iconName: string): void {
    this.clearAlerts();
    service.icon = iconName;
  }

  setMode(mode: 'form' | 'json'): void {
    this.clearAlerts();
    if (mode === 'json') {
      this.jsonText = this.adminService.stringifyCatalog(this.catalog);
      this.editorMode = 'json';
      return;
    }

    if (this.editorMode === 'json') {
      const result = this.adminService.parseAndFormatJson(this.jsonText);
      if (result.error || !result.catalog) {
        this.errorMessage = result.error ?? 'Invalid JSON.';
        return;
      }
      this.catalog = result.catalog;
    }

    this.editorMode = 'form';
  }

  selectService(index: number): void {
    this.clearAlerts();
    this.selectedIndex = index;
  }

  addService(): void {
    this.clearAlerts();
    const res = this.adminService.addService(this.catalog);
    this.catalog = res.catalog;
    this.selectedIndex = res.selectedIndex;
    this.jsonText = this.adminService.stringifyCatalog(this.catalog);
    this.statusMessage = res.message;
  }

  duplicateService(index: number): void {
    this.clearAlerts();
    const res = this.adminService.duplicateService(this.catalog, index);
    if (res.error) {
      this.errorMessage = res.error;
      return;
    }
    this.catalog = res.catalog;
    this.selectedIndex = res.selectedIndex;
    this.jsonText = this.adminService.stringifyCatalog(this.catalog);
    this.statusMessage = res.message ?? '';
  }

  removeService(index: number): void {
    this.clearAlerts();
    const res = this.adminService.removeService(this.catalog, index);
    if (res.error) {
      this.errorMessage = res.error;
      return;
    }
    this.catalog = res.catalog;
    this.selectedIndex = res.selectedIndex;
    this.jsonText = this.adminService.stringifyCatalog(this.catalog);
    this.statusMessage = res.message ?? '';
  }

  addStringItem(list: string[], placeholder: string): void {
    this.adminService.addListItem(list, placeholder);
  }

  removeStringItem(list: string[], index: number): void {
    this.adminService.removeListItem(list, index);
  }

  addSmartItem(service: ServiceOfferingDetail): void {
    this.adminService.addSmartItem(service);
  }

  removeSmartItem(service: ServiceOfferingDetail, index: number): void {
    this.adminService.removeSmartItem(service, index);
  }

  addCaseStudy(service: ServiceOfferingDetail): void {
    this.adminService.addCaseStudy(service);
  }

  removeCaseStudy(service: ServiceOfferingDetail, index: number): void {
    this.adminService.removeCaseStudy(service, index);
  }

  formatJson(): void {
    this.clearAlerts();
    const result = this.adminService.parseAndFormatJson(this.jsonText);
    if (result.error || !result.formatted) {
      this.errorMessage = result.error ?? 'Invalid JSON.';
      return;
    }
    this.jsonText = result.formatted;
    this.statusMessage = 'Formatted JSON successfully.';
  }

  saveCatalog(): void {
    this.clearAlerts();
    let target = this.catalog;

    if (this.editorMode === 'json') {
      const parsed = this.adminService.parseAndFormatJson(this.jsonText);
      if (parsed.error || !parsed.catalog) {
        this.errorMessage = parsed.error ?? 'Invalid JSON.';
        return;
      }
      target = parsed.catalog;
      this.catalog = parsed.catalog;
    }

    const result = this.adminService.saveDraft(target);
    if (!result.ok) {
      this.errorMessage = result.error ?? 'Failed to save catalog.';
      return;
    }

    this.jsonText = this.adminService.stringifyCatalog(this.catalog);
    this.statusMessage = result.message ?? 'Saved catalog.';
  }

  resetDefault(): void {
    this.clearAlerts();
    this.adminService.resetToDefault()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.syncFromService();
        this.selectedIndex = 0;
        this.statusMessage = 'Reset catalog to default configuration.';
      });
  }

  downloadJson(): void {
    this.clearAlerts();
    let payload = this.catalog;

    if (this.editorMode === 'json') {
      const parsed = this.adminService.parseAndFormatJson(this.jsonText);
      if (parsed.error || !parsed.catalog) {
        this.errorMessage = parsed.error ?? 'Cannot download invalid JSON.';
        return;
      }
      payload = parsed.catalog;
    }

    this.adminService.downloadJson(payload);
    this.statusMessage = 'Downloaded services-catalog.json.';
  }

  private syncFromService(): void {
    this.catalog = this.adminService.getDraftClone();
    if (this.selectedIndex >= this.catalog.services.length) {
      this.selectedIndex = Math.max(0, this.catalog.services.length - 1);
    }
    this.jsonText = this.adminService.stringifyCatalog(this.catalog);
  }

  private clearAlerts(): void {
    this.errorMessage = '';
    this.statusMessage = '';
  }
}