import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiexoBillboard1Component } from './jiexo-billboard-1.component';

describe('JiexoBillboard1Component', () => {
  let component: JiexoBillboard1Component;
  let fixture: ComponentFixture<JiexoBillboard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JiexoBillboard1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiexoBillboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
