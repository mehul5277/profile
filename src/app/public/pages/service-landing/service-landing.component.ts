import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  ServiceKey,
  ServiceOfferingDetail
} from './.././../metadata/service-showcase.data';
import {
  ServicesCatalogResponse,
  ServicesCatalogService
} from './../../services/services-catalog.service';

@Component({
  selector: 'app-service-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './service-landing.component.html',
  styleUrls: ['./service-landing.component.scss']
})
export class ServiceLandingComponent implements OnInit, OnDestroy {
  @Input() serviceSlug?: ServiceKey;

  services: ServiceOfferingDetail[] = [];
  activeService!: ServiceOfferingDetail;

  editorOpen = false;
  jsonDraft = '';
  editorError = '';
  editorStatus = '';

  private pendingSlug?: ServiceKey;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private catalogService: ServicesCatalogService
  ) { }

  ngOnInit(): void {
    if (this.serviceSlug) {
      this.pendingSlug = this.serviceSlug;
    }

    this.catalogService.catalog$
      .pipe(takeUntil(this.destroy$))
      .subscribe((catalog: any) => {
        this.applyCatalog(catalog);
      });

    this.catalogService.loadCatalog()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const slug = params.get('slug') as ServiceKey | null;
        if (slug) {
          this.pendingSlug = slug;
          this.selectService(slug);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectService(key: ServiceKey): void {
    const match = this.services.find((s) => s.key === key);
    if (match) {
      this.activeService = match;
    }
  }

  toggleEditor(): void {
    this.editorOpen = !this.editorOpen;
    this.editorError = '';
    this.editorStatus = '';
    if (this.editorOpen) {
      this.jsonDraft = JSON.stringify(this.catalogService.getCurrentCatalog(), null, 2);
    }
  }

  formatJsonDraft(): void {
    this.editorError = '';
    this.editorStatus = '';
    try {
      const parsed = JSON.parse(this.jsonDraft);
      this.jsonDraft = JSON.stringify(parsed, null, 2);
      this.editorStatus = 'JSON formatted cleanly.';
    } catch (err) {
      this.editorError = `Invalid JSON: ${(err as Error).message}`;
    }
  }

  applyJsonChanges(): void {
    this.editorError = '';
    this.editorStatus = '';

    try {
      const parsed = JSON.parse(this.jsonDraft) as ServicesCatalogResponse;
      if (!parsed || !Array.isArray(parsed.services) || parsed.services.length === 0) {
        this.editorError = 'Catalog JSON must contain a non-empty "services" array.';
        return;
      }

      this.catalogService.saveCatalog(parsed);
      this.editorStatus = 'Saved catalog changes and updated the view.';
    } catch (err) {
      this.editorError = `Cannot apply changes — invalid JSON: ${(err as Error).message}`;
    }
  }

  resetCatalog(): void {
    this.editorError = '';
    this.editorStatus = '';
    this.catalogService.resetToDefaultFromAsset()
      .pipe(takeUntil(this.destroy$))
      .subscribe((catalog: any) => {
        this.jsonDraft = JSON.stringify(catalog, null, 2);
        this.editorStatus = 'Reset catalog to default.';
      });
  }

  downloadJson(): void {
    this.editorError = '';
    try {
      if (this.editorOpen && this.jsonDraft.trim()) {
        const parsed = JSON.parse(this.jsonDraft) as ServicesCatalogResponse;
        this.catalogService.downloadCatalogJson(parsed);
        this.editorStatus = 'Downloaded services-catalog.json.';
      } else {
        this.catalogService.downloadCatalogJson();
        this.editorStatus = 'Downloaded services-catalog.json.';
      }
    } catch (err) {
      this.editorError = `Cannot download — fix JSON syntax first: ${(err as Error).message}`;
    }
  }

  private applyCatalog(catalog: ServicesCatalogResponse): void {
    this.services = catalog.services;
    if (!this.services.length) {
      return;
    }

    const currentKey = this.pendingSlug ?? this.activeService?.key ?? 'ai-automation';
    this.activeService =
      this.services.find((s) => s.key === currentKey) ??
      this.services.find((s) => s.key === 'ai-automation') ??
      this.services[0];

    if (!this.editorOpen) {
      this.jsonDraft = JSON.stringify(catalog, null, 2);
    }
  }
}