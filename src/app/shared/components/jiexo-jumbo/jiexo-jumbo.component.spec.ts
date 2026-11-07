import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiexoJumboComponent } from './jiexo-jumbo.component';

describe('JiexoJumboComponent', () => {
  let component: JiexoJumboComponent;
  let fixture: ComponentFixture<JiexoJumboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JiexoJumboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiexoJumboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
