import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerClientComponent } from './ticker-client.component';

describe('TickerClientComponent', () => {
  let component: TickerClientComponent;
  let fixture: ComponentFixture<TickerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TickerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
