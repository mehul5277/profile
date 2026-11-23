import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { ServiceOfferingDetail } from './../metadata/service-showcase.data';

export interface ServicesCatalogResponse {
  brand: string;
  tagline: string;
  services: ServiceOfferingDetail[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesCatalogService {
  private readonly catalogUrl = 'assets/data/services-catalog.json';
  private catalog$?: Observable<ServicesCatalogResponse>;

  constructor(private http: HttpClient) {}

  getCatalog(): Observable<ServicesCatalogResponse> {
    if (!this.catalog$) {
      this.catalog$ = this.http
        .get<ServicesCatalogResponse>(this.catalogUrl)
        .pipe(shareReplay(1));
    }
    return this.catalog$;
  }
}