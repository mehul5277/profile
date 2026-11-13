import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLeaseComponent } from './sub-lease.component';

describe('SubLeaseComponent', () => {
  let component: SubLeaseComponent;
  let fixture: ComponentFixture<SubLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubLeaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
