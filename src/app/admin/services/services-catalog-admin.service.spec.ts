import { TestBed } from '@angular/core/testing';

import { ServicesCatalogAdminService } from './services-catalog-admin.service';

describe('ServicesCatalogAdminService', () => {
  let service: ServicesCatalogAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesCatalogAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
