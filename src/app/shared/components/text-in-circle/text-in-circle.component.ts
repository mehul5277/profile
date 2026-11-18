import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class TextInCircleComponent implements OnInit {
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

  fontOptions: SelectOption[] = [
    { id: 'Arial, sans-serif', label: 'Arial (Clean Sans)' },
    { id: '"Times New Roman", serif', label: 'Times New Roman (Classic Serif)' },
    { id: '"Playfair Display", Georgia, serif', label: 'Playfair Display (Editorial Serif)' },
    { id: '"Cinzel", Georgia, serif', label: 'Cinzel (Engraved Crest)' },
    { id: '"Montserrat", sans-serif', label: 'Montserrat (Modern Geometric)' },
    { id: '"Oswald", sans-serif', label: 'Oswald (Condensed Display)' },
    { id: '"Great Vibes", cursive', label: 'Great Vibes (Calligraphy Script)' },
    { id: '"Courier New", monospace', label: 'Courier New (Typewriter)' }
  ];

  centerIcons: SelectOption[] = [
    { id: 'none', label: 'None' },
    { id: 'star', label: 'Classic Star (★)' },
    { id: 'heart', label: 'Heart (♥)' },
    { id: 'crown', label: 'Royal Crown' },
    { id: 'diamond', label: 'Ornamental Diamond (❖)' },
    { id: 'laurel-dot', label: 'Triple Crest Dots' }
  ];

  dividerSymbols: string[] = ['•', '★', '♥', '✦', '❖', '❦'];

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

  // Advanced Typography & Independent Color Getters
  get fontFamily(): string { return this.form.get('fontFamily')?.value || 'Arial, sans-serif'; }
  get isAllCaps(): boolean { return this.form.get('isAllCaps')?.value || false; }
  get frameColor(): string { return this.form.get('frameColor')?.value || '#a62626'; }
  get outerFontColor(): string { return this.form.get('outerFontColor')?.value || '#111111'; }
  get innerFontColor(): string { return this.form.get('innerFontColor')?.value || '#111111'; }
  get letterSpacing(): number { return this.form.get('letterSpacing')?.value ?? 2; }
  get topArcSpan(): number { return this.form.get('topArcSpan')?.value ?? 180; }
  get bottomArcSpan(): number { return this.form.get('bottomArcSpan')?.value ?? 180; }
  get centerIcon(): string { return this.form.get('centerIcon')?.value || 'none'; }
  get textOutlineWidth(): number { return this.form.get('textOutlineWidth')?.value ?? 0; }
  get textOutlineColor(): string { return this.form.get('textOutlineColor')?.value || '#ffffff'; }

  // Scaling, Rotation & Animation Getters
  get overallScale(): number { return this.form.get('overallScale')?.value ?? 1; }
  get outerTextScale(): number { return this.form.get('outerTextScale')?.value ?? 1; }
  get middleScale(): number { return this.form.get('middleScale')?.value ?? 1; }
  get badgeRotation(): number { return this.form.get('badgeRotation')?.value ?? 0; }
  get outerTextRotation(): number { return this.form.get('outerTextRotation')?.value ?? 0; }
  get centerTextRotation(): number { return this.form.get('centerTextRotation')?.value ?? 0; }
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

  get topArcPath(): string {
    return this.describeArc(200, 200, this.topArcRadius, -this.topArcSpan / 2, this.topArcSpan / 2, true);
  }

  get bottomArcPath(): string {
    return this.describeArc(200, 200, this.bottomArcRadius, 180 + this.bottomArcSpan / 2, 180 - this.bottomArcSpan / 2, false);
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
      fontFamily: ['Arial, sans-serif'],
      isAllCaps: [false],
      frameColor: ['#a62626'],
      outerFontColor: ['#111111'],
      innerFontColor: ['#111111'],
      letterSpacing: [2],
      topArcSpan: [180],
      bottomArcSpan: [180],
      centerIcon: ['none'],
      textOutlineWidth: [0],
      textOutlineColor: ['#ffffff'],
      overallScale: [1],
      outerTextScale: [1],
      middleScale: [1],
      badgeRotation: [0],
      outerTextRotation: [0],
      centerTextRotation: [0],
      outerTextAnimation: ['none'],
      centerTextAnimation: ['none'],
      exportWidth: [1000],
      exportHeight: [1000],
      preserveAspectRatio: [true],
      transparentPng: [false]
    });

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

  ngOnInit(): void {
    this.loadGoogleFonts();
  }

  resetRotations(): void {
    this.form.patchValue({
      badgeRotation: 0,
      outerTextRotation: 0,
      centerTextRotation: 0
    });
  }

  private loadGoogleFonts(): void {
    const id = 'text-in-circle-google-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Great+Vibes&family=Montserrat:wght@600;700&family=Oswald:wght@600;700&family=Playfair+Display:wght@600;700&display=swap';
      document.head.appendChild(link);
    }
  }

  insertDivider(targetControl: 'topText' | 'bottomText', symbol: string): void {
    const current = this.form.get(targetControl)?.value || '';
    const updated = current ? `${current} ${symbol} ` : `${symbol} `;
    this.form.patchValue({ [targetControl]: updated });
  }

  setPresetResolution(size: number): void {
    this.form.patchValue({
      exportWidth: size,
      exportHeight: size
    });
  }

  private describeArc(cx: number, cy: number, r: number, startAngleDeg: number, endAngleDeg: number, clockwise: boolean): string {
    const startRad = ((startAngleDeg - 90) * Math.PI) / 180;
    const endRad = ((endAngleDeg - 90) * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const angleDiff = Math.abs(endAngleDeg - startAngleDeg);
    const largeArcFlag = angleDiff > 180 ? 1 : 0;
    const sweepFlag = clockwise ? 1 : 0;

    return `M ${x1.toFixed(2)},${y1.toFixed(2)} A ${r.toFixed(2)},${r.toFixed(2)} 0 ${largeArcFlag},${sweepFlag} ${x2.toFixed(2)},${y2.toFixed(2)}`;
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
    this.renderToCanvas('image/png', `text-in-circle-${this.selectedFrame}-${this.exportWidth}x${this.exportHeight}.png`, this.transparentPng);
  }

  downloadJpg(): void {
    this.renderToCanvas('image/jpeg', `text-in-circle-${this.selectedFrame}-${this.exportWidth}x${this.exportHeight}.jpg`, false);
  }

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