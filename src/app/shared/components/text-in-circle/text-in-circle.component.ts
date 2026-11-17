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

  // Text & Frame Getters
  get topText(): string { return this.form.get('topText')?.value || ''; }
  get middleText(): string { return this.form.get('middleText')?.value || ''; }
  get bottomText(): string { return this.form.get('bottomText')?.value || ''; }
  get selectedFrame(): string { return this.form.get('selectedFrame')?.value || 'classic-double'; }

  // Circle Border Thickness & Background Color Getters
  get outerBorderWidth(): number { return this.form.get('outerBorderWidth')?.value ?? 4; }
  get innerBorderWidth(): number { return this.form.get('innerBorderWidth')?.value ?? 3; }
  get outerBgColor(): string { return this.form.get('outerBgColor')?.value || '#ffffff'; }
  get innerBgColor(): string { return this.form.get('innerBgColor')?.value || '#ffffff'; }

  // Formatting Getters
  get fontFamily(): string { return this.form.get('fontFamily')?.value || 'Arial'; }
  get isAllCaps(): boolean { return this.form.get('isAllCaps')?.value || false; }
  get frameColor(): string { return this.form.get('frameColor')?.value || '#000000'; }
  get fontColor(): string { return this.form.get('fontColor')?.value || '#000000'; }
  get letterSpacing(): number { return this.form.get('letterSpacing')?.value ?? 2; }

  // Scaling & Independent Animation Getters
  get overallScale(): number { return this.form.get('overallScale')?.value ?? 1; }
  get outerTextScale(): number { return this.form.get('outerTextScale')?.value ?? 1; }
  get middleScale(): number { return this.form.get('middleScale')?.value ?? 1; }
  get outerTextAnimation(): string { return this.form.get('outerTextAnimation')?.value || 'none'; }
  get centerTextAnimation(): string { return this.form.get('centerTextAnimation')?.value || 'none'; }

  // Dynamic Arc Radii so scaled outer text stays vertically centered inside the ring track
  get topArcRadius(): number {
    return 153 - (30 * this.outerTextScale) * 0.3;
  }

  get bottomArcRadius(): number {
    return 153 + (30 * this.outerTextScale) * 0.36;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedFrame: ['classic-double'],
      topText: ['SARAH • BRAD ★ AMY'],
      middleText: ['WILSON'],
      bottomText: ['EST. 2020'],
      outerBorderWidth: [4],
      innerBorderWidth: [3],
      outerBgColor: ['#ffffff'],
      innerBgColor: ['#ffffff'],
      fontFamily: ['Arial'],
      isAllCaps: [false],
      frameColor: ['#000000'],
      fontColor: ['#000000'],
      letterSpacing: [2],
      overallScale: [1],
      outerTextScale: [1],
      middleScale: [1],
      outerTextAnimation: ['none'],
      centerTextAnimation: ['none']
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

  downloadPng(): void {
    const svgElement = this.svgContainer.nativeElement.querySelector('svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = window.URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            this.triggerDownload(blob, `text-in-circle-${this.selectedFrame}.png`);
          }
          window.URL.revokeObjectURL(url);
        }, 'image/png');
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