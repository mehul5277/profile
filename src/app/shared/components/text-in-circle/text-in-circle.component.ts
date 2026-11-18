import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

export interface SelectOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-text-in-circle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-in-circle.component.html',
  styleUrls: ['./text-in-circle.component.scss']
})
export class TextInCircleComponent {
  form: FormGroup;
  @ViewChild('svgContainer', { static: false }) svgContainer!: ElementRef;

  miscFrames: SelectOption[] = [
    { id: 'classic-double', label: 'Classic Double Circle' },
    { id: 'family-banner-ring', label: 'Family Banner Ring (Horizontal Lines)' },
    { id: 'scalloped-seal', label: 'Scalloped Stamp Seal' },
    { id: 'rope-ring', label: 'Twisted Rope Border' },
    { id: 'dotted-crest', label: 'Dotted Wreath Crest' },
    { id: 'octagon-emblem', label: 'Octagon Frame' }
  ];

  outerTextAnimations: SelectOption[] = [
    { id: 'none', label: 'None (Static)' },
    { id: 'spin-cw', label: 'Rotate Clockwise' },
    { id: 'spin-ccw', label: 'Rotate Counter-Clockwise' },
    { id: 'rock', label: 'Gentle Rocking' },
    { id: 'fade-pulse', label: 'Opacity Pulse' }
  ];

  centerTextAnimations: SelectOption[] = [
    { id: 'none', label: 'None (Static)' },
    { id: 'pulse', label: 'Heartbeat Pulse' },
    { id: 'float', label: 'Vertical Float' },
    { id: 'wiggle', label: 'Subtle Tilt Wiggle' },
    { id: 'fade-pulse', label: 'Opacity Pulse' }
  ];

  resolutionPresets: number[] = [500, 1000, 2000, 4000];

  // Text & Frame Getters
  get topText(): string { return this.form.get('topText')?.value || ''; }
  get middleTopSubText(): string { return this.form.get('middleTopSubText')?.value || ''; }
  get middleText(): string { return this.form.get('middleText')?.value || ''; }
  get middleBottomSubText(): string { return this.form.get('middleBottomSubText')?.value || ''; }
  get bottomText(): string { return this.form.get('bottomText')?.value || ''; }
  get selectedFrame(): string { return this.form.get('selectedFrame')?.value || 'family-banner-ring'; }

  // Border & Background Getters
  get outerBorderWidth(): number { return this.form.get('outerBorderWidth')?.value ?? 3; }
  get innerBorderWidth(): number { return this.form.get('innerBorderWidth')?.value ?? 2.5; }
  get outerBgColor(): string { return this.form.get('outerBgColor')?.value || '#ffffff'; }
  get innerBgColor(): string { return this.form.get('innerBgColor')?.value || '#ffffff'; }

  // Formatting Getters
  get fontFamily(): string { return this.form.get('fontFamily')?.value || 'Arial'; }
  get isAllCaps(): boolean { return this.form.get('isAllCaps')?.value || false; }
  get frameColor(): string { return this.form.get('frameColor')?.value || '#a62626'; }
  get fontColor(): string { return this.form.get('fontColor')?.value || '#111111'; }
  get letterSpacing(): number { return this.form.get('letterSpacing')?.value ?? 2; }

  // Scaling & Animations Getters
  get overallScale(): number { return this.form.get('overallScale')?.value ?? 1; }
  get outerTextScale(): number { return this.form.get('outerTextScale')?.value ?? 1; }
  get middleScale(): number { return this.form.get('middleScale')?.value ?? 1; }
  get outerTextAnimation(): string { return this.form.get('outerTextAnimation')?.value || 'none'; }
  get centerTextAnimation(): string { return this.form.get('centerTextAnimation')?.value || 'none'; }

  // Export & Print Getters
  get exportWidth(): number { return this.form.get('exportWidth')?.value ?? 1000; }
  get exportHeight(): number { return this.form.get('exportHeight')?.value ?? 1000; }
  get preserveAspectRatio(): boolean { return this.form.get('preserveAspectRatio')?.value ?? true; }
  get transparentPng(): boolean { return this.form.get('transparentPng')?.value ?? false; }

  get topArcRadius(): number {
    return 153 - (30 * this.outerTextScale) * 0.3;
  }

  get bottomArcRadius(): number {
    return 153 + (30 * this.outerTextScale) * 0.36;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedFrame: ['family-banner-ring'],
      topText: ['SARAH • BRAD ★ AMY'],
      middleTopSubText: ['THE'],
      middleText: ['WILSON'],
      middleBottomSubText: ['FAMILY'],
      bottomText: ['EST. 2020'],
      outerBorderWidth: [3],
      innerBorderWidth: [2.5],
      outerBgColor: ['#ffffff'],
      innerBgColor: ['#ffffff'],
      fontFamily: ['Arial'],
      isAllCaps: [false],
      frameColor: ['#a62626'],
      fontColor: ['#111111'],
      letterSpacing: [2],
      overallScale: [1],
      outerTextScale: [1],
      middleScale: [1],
      outerTextAnimation: ['none'],
      centerTextAnimation: ['none'],
      // Export & Print Controls
      exportWidth: [1000],
      exportHeight: [1000],
      preserveAspectRatio: [true],
      transparentPng: [false]
    });

    // Sync width & height when preserveAspectRatio is enabled
    this.form.get('exportHeight')?.valueChanges.subscribe((val) => {
      if (this.preserveAspectRatio && val) {
        this.form.patchValue({ exportWidth: val }, { emitEvent: false });
      }
    });

    this.form.get('exportWidth')?.valueChanges.subscribe((val) => {
      if (this.preserveAspectRatio && val) {
        this.form.patchValue({ exportHeight: val }, { emitEvent: false });
      }
    });

    this.form.get('preserveAspectRatio')?.valueChanges.subscribe((locked) => {
      if (locked) {
        this.form.patchValue({ exportWidth: this.exportHeight }, { emitEvent: false });
      }
    });
  }

  setPresetResolution(size: number): void {
    this.form.patchValue({
      exportWidth: size,
      exportHeight: size
    });
  }

  getScallopedPath(cx: number, cy: number, outerR: number, innerR: number, points: number): string {
    const step = (Math.PI * 2) / points;
    let d = '';
    for (let i = 0; i < points; i++) {
      const a1 = i * step;
      const a2 = a1 + step / 2;
      const a3 = a1 + step;

      const x1 = cx + innerR * Math.cos(a1);
      const y1 = cy + innerR * Math.sin(a1);
      const cxCtrl = cx + outerR * Math.cos(a2);
      const cyCtrl = cy + outerR * Math.sin(a2);
      const x2 = cx + innerR * Math.cos(a3);
      const y2 = cy + innerR * Math.sin(a3);

      d += i === 0 ? `M ${x1.toFixed(1)},${y1.toFixed(1)} ` : '';
      d += `Q ${cxCtrl.toFixed(1)},${cyCtrl.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} `;
    }
    return d + 'Z';
  }

  // 1. Export Vector SVG
  downloadSvg(): void {
    const svgElement = this.svgContainer.nativeElement.querySelector('svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    this.triggerDownload(blob, `text-in-circle-${this.selectedFrame}.svg`);
  }

  // 2. Export Raster PNG (Supports Transparency & Custom Dimensions)
  downloadPng(): void {
    this.renderToCanvas('image/png', `text-in-circle-${this.selectedFrame}-${this.exportWidth}x${this.exportHeight}.png`, this.transparentPng);
  }

  // 3. Export Raster JPG (Always solid white canvas background)
  downloadJpg(): void {
    this.renderToCanvas('image/jpeg', `text-in-circle-${this.selectedFrame}-${this.exportWidth}x${this.exportHeight}.jpg`, false);
  }

  // 4. Print / Save as PDF via Browser Print Engine
  printOrSavePdf(): void {
    window.print();
  }

  private renderToCanvas(mimeType: 'image/png' | 'image/jpeg', filename: string, isTransparent: boolean): void {
    const svgElement = this.svgContainer.nativeElement.querySelector('svg');
    if (!svgElement) return;

    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
    if (!this.preserveAspectRatio) {
      clonedSvg.setAttribute('preserveAspectRatio', 'none');
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);

    const width = Math.max(100, Math.min(8000, Number(this.exportWidth) || 1000));
    const height = Math.max(100, Math.min(8000, Number(this.exportHeight) || 1000));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = window.URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isTransparent) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              this.triggerDownload(blob, filename);
            }
            window.URL.revokeObjectURL(url);
          },
          mimeType,
          mimeType === 'image/jpeg' ? 0.95 : undefined
        );
      }
    };

    img.src = url;
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}