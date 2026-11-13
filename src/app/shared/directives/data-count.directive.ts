import { Directive, Input, ElementRef, Renderer2, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appDataCount]',
  standalone: true
})
export class DataCountDirective implements AfterViewInit, OnDestroy {

  // Target number to animate to
  @Input('appDataCount') endValue: number = 0;
  
  // Starting number (defaults to 0)
  @Input() startValue: number = 0;
  
  // Animation duration in milliseconds (defaults to 1500ms)
  @Input() duration: number = 1500;

  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private render: Renderer2,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    // Run all performance-heavy browser APIs outside Angular change detection zone
    this.ngZone.runOutsideAngular(() => {
      this.setupIntersectionObserver();
    });
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, // Entire browser viewport
      threshold: 1.0 // Only triggers when the element is 100% visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateValue();
          
          // Stop watching this element once the animation starts
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private animateValue() {
    let startTimestamp: number | null = null;
    const start = this.startValue;
    const end = this.endValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / this.duration, 1);
      
      // Update DOM node text safely
      this.render.setProperty(
        this.el.nativeElement,
        'innerHTML',
        Math.floor(progress * (end - start) + start).toString()
      );

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

