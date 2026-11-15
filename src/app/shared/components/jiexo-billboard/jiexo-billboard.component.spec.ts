import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiexoBillboardComponent } from './jiexo-billboard.component';

describe('JiexoBillboardComponent', () => {
  let component: JiexoBillboardComponent;
  let fixture: ComponentFixture<JiexoBillboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JiexoBillboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiexoBillboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
