import { Directive, Input, ElementRef, Renderer2, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appDataCount]',
  standalone: true
})
export class DataCountDirective implements AfterViewInit, OnDestroy {

  @Input('appDataCount') endValue: number = 0;
  @Input() startValue: number = 0;
  @Input() duration: number = 1500;
  
  // Custom prefix and suffix inputs
  @Input() prefix: string = '';
  @Input() suffix: string = '';

  private observer!: IntersectionObserver;
  private numberFormatter = new Intl.NumberFormat('en-US');

  constructor(
    private el: ElementRef<HTMLElement>,
    private render: Renderer2,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.setupIntersectionObserver();
    });
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, 
      threshold: 0.1 
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerRevealAndAnimation();
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private triggerRevealAndAnimation() {
    const parentContainer = this.el.nativeElement.parentElement;
    
    if (parentContainer && parentContainer.classList.contains('text')) {
      parentContainer.animate(
        [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], 
        {
          duration: 600,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          fill: 'forwards'
        }
      );
    }

    this.animateValue();
  }

  private animateValue() {
    let startTimestamp: number | null = null;
    const start = this.startValue;
    const end = this.endValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / this.duration, 1);
      
      const currentRawValue = Math.floor(progress * (end - start) + start);
      const formattedValue = this.numberFormatter.format(currentRawValue);

      // Concatenate the prefix, formatted number, and suffix together
      const finalDisplayString = `${this.prefix}${formattedValue}${this.suffix}`;

      this.render.setProperty(
        this.el.nativeElement,
        'innerHTML',
        finalDisplayString
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
