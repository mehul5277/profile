import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCatalogAdminComponent } from './services-catalog-admin.component';

describe('ServicesCatalogAdminComponent', () => {
  let component: ServicesCatalogAdminComponent;
  let fixture: ComponentFixture<ServicesCatalogAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesCatalogAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesCatalogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
