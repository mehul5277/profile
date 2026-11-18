import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInCircleComponent } from './text-in-circle.component';

describe('TextInCircleComponent', () => {
  let component: TextInCircleComponent;
  let fixture: ComponentFixture<TextInCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
