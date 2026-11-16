import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiexoBillboard2Component } from './jiexo-billboard-2.component';

describe('JiexoBillboard2Component', () => {
  let component: JiexoBillboard2Component;
  let fixture: ComponentFixture<JiexoBillboard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JiexoBillboard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiexoBillboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
