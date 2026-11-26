import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionMegaMenuComponent } from './solution-mega-menu.component';

describe('SolutionMegaMenuComponent', () => {
  let component: SolutionMegaMenuComponent;
  let fixture: ComponentFixture<SolutionMegaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionMegaMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionMegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
