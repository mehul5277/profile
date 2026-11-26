import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMegaMenuComponent } from './service-mega-menu.component';

describe('ServiceMegaMenuComponent', () => {
  let component: ServiceMegaMenuComponent;
  let fixture: ComponentFixture<ServiceMegaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceMegaMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceMegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
