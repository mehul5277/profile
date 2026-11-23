import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JixoSectionComponent } from './jixo-section.component';

describe('JixoSectionComponent', () => {
  let component: JixoSectionComponent;
  let fixture: ComponentFixture<JixoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JixoSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JixoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
