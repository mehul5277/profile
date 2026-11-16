import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';

export interface BillboardConfig {
  // --- Original Properties ---
  tagline: string;
  headline: string;
  subtitle: string;

  // --- Visuals & Media ---
  backgroundImageUrl?: string;
  videoBackgroundUrl?: string;
  overlayOpacity?: number; // Value between 0 and 1
  backgroundColor?: string;

  // --- Call to Action (CTA) ---
  primaryCta?: {
    label: string;
    url: string;
    target?: '_blank' | '_self';
  };
  secondaryCta?: {
    label: string;
    url: string;
    target?: '_blank' | '_self';
  };

  // --- Layout & Styling ---
  alignment?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  height?: 'compact' | 'standard' | 'full-screen';

  // --- Accessibility & SEO ---
  imageAltText?: string;
  isPriorityHeading?: boolean;

  // --- Analytics & Tracking ---
  trackingId?: string;
}

@Component({
  selector: 'app-jiexo-billboard-2',
  standalone: true,
  imports: [NgClass, NgIf, JsonPipe],
  templateUrl: './jiexo-billboard-2.component.html',
  styleUrl: './jiexo-billboard-2.component.scss'
})
export class JiexoBillboard2Component implements OnInit {
  config: BillboardConfig = {
    tagline: 'Limited Time Offer',
    headline: 'Bring Creative Ideas to Life with Our New Platform',
    subtitle: 'Streamline your design workflow, collaborate seamlessly with distributed engineering teams, and deploy pixel-perfect experiences instantly.',
    backgroundImageUrl: 'https://unsplash.com',
    videoBackgroundUrl: 'https://mixkit.co',
    overlayOpacity: 0.55,
    backgroundColor: 'bg-default',
    alignment: 'center',
    theme: 'dark',
    height: 'standard',
    isPriorityHeading: true,
    imageAltText: 'Abstract dark purple and blue waves representing technological synergy',
    primaryCta: {
      label: 'Get Started Free',
      url: 'https://example.com',
      target: '_self'
    },
    secondaryCta: {
      label: 'Book a Demo',
      url: 'https://example.com',
      target: '_blank'
    },
    trackingId: 'CAMP-HERO-2026-Q4'
  };

  // Emits analytics events when buttons are clicked
  @Output() ctaClick = new EventEmitter<{ type: 'primary' | 'secondary'; trackingId?: string }>();

  // Default fallbacks handled locally
  overlayOpacity: number = 0.4;
  backgroundColor = '#1a1a1a';
  alignment: 'left' | 'center' | 'right' = 'center';
  theme: 'light' | 'dark' = 'dark';
  height: 'compact' | 'standard' | 'full-screen' = 'standard';

  ngOnInit(): void {
    // this.overlayOpacity = this.configS().overlayOpacity ?? this.overlayOpacity;
    // this.backgroundColor = this.configS().backgroundColor ?? this.backgroundColor;
    // this.alignment = this.configS().alignment ?? this.alignment;
    // this.theme = this.configS().theme ?? this.theme;
    // this.height = this.configS().height ?? this.height;
  }



  // CSS Class Resolvers
  get heightClass(): string {
    const classes = {
      compact: 'min-h-[300px] py-12',
      standard: 'min-h-[500px] py-24',
      'full-screen': 'min-h-screen py-32',
    };
    return classes[this.height];
  }

  get alignmentClass(): string {
    const classes = {
      left: 'text-left items-start justify-start',
      center: 'text-center items-center justify-center',
      right: 'text-right items-end justify-end',
    };
    return classes[this.alignment];
  }

  get themeClasses(): string {
    return this.theme === 'light' ? 'text-gray-900' : 'text-white';
  }

  get taglineColor(): string {
    return this.theme === 'light' ? 'text-indigo-600' : 'text-indigo-400';
  }

  get subtitleColor(): string {
    return this.theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  }

  onHandleClick(type: 'primary' | 'secondary'): void {
    this.ctaClick.emit({
      type,
      trackingId: this.config.trackingId
    });
  }
}