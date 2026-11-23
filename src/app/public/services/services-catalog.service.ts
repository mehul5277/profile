import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import {
  ALL_SERVICES_DETAIL,
  ServiceOfferingDetail
} from './../metadata/service-showcase.data';

export interface ServicesCatalogResponse {
  brand: string;
  tagline: string;
  services: ServiceOfferingDetail[];
}

const STORAGE_KEY = 'jixo_services_catalog_v1';

@Injectable({
  providedIn: 'root'
})
export class ServicesCatalogService {
  private readonly catalogUrl = 'assets/data/pages/services-catalog.json';
  private readonly fallbackCatalog: ServicesCatalogResponse = {
    brand: 'JIXO',
    tagline: 'Journey In eXponential Optimization',
    services: ALL_SERVICES_DETAIL
  };

  private readonly catalogSubject$ = new BehaviorSubject<ServicesCatalogResponse>(
    this.readFromStorage() ?? this.fallbackCatalog
  );

  readonly catalog$: Observable<ServicesCatalogResponse> = this.catalogSubject$.asObservable();

  constructor(private http: HttpClient) {}

  loadCatalog(forceReload = false): Observable<ServicesCatalogResponse> {
    const cached = this.readFromStorage();
    if (cached && !forceReload) {
      this.catalogSubject$.next(cached);
      return of(cached);
    }

    return this.http.get<ServicesCatalogResponse>(this.catalogUrl).pipe(
      tap((data) => {
        this.writeToStorage(data);
        this.catalogSubject$.next(data);
      }),
      catchError(() => {
        const current = this.catalogSubject$.value;
        return of(current);
      })
    );
  }

  getCurrentCatalog(): ServicesCatalogResponse {
    return this.catalogSubject$.value;
  }

  saveCatalog(updated: ServicesCatalogResponse): void {
    this.writeToStorage(updated);
    this.catalogSubject$.next(updated);
  }

  resetToDefaultFromAsset(): Observable<ServicesCatalogResponse> {
    localStorage.removeItem(STORAGE_KEY);
    return this.http.get<ServicesCatalogResponse>(this.catalogUrl).pipe(
      tap((data) => {
        this.writeToStorage(data);
        this.catalogSubject$.next(data);
      }),
      catchError(() => {
        this.catalogSubject$.next(this.fallbackCatalog);
        return of(this.fallbackCatalog);
      })
    );
  }

  downloadCatalogJson(catalog: ServicesCatalogResponse = this.catalogSubject$.value): void {
    const jsonString = JSON.stringify(catalog, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'services-catalog.json';
    anchor.click();

    URL.revokeObjectURL(url);
  }

  private readFromStorage(): ServicesCatalogResponse | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as ServicesCatalogResponse;
      return Array.isArray(parsed.services) ? parsed : null;
    } catch {
      return null;
    }
  }

  private writeToStorage(data: ServicesCatalogResponse): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }
}