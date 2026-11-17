import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

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

  get topText(): string { return this.form.get('topText')?.value || ''; }
  get middleText(): string { return this.form.get('middleText')?.value || ''; }
  get bottomText(): string { return this.form.get('bottomText')?.value || ''; }
  get fontFamily(): string { return this.form.get('fontFamily')?.value || 'Arial'; }
  get isAllCaps(): boolean { return this.form.get('isAllCaps')?.value || false; }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      topText: ['SARAH • BRAD ★ AMY'],
      middleText: ['WILSON'],
      bottomText: ['EST. 2020'],
      fontFamily: ['Arial'],
      isAllCaps: [false]
    });
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
    this.triggerDownload(blob, 'text-in-circle.svg');
  }

  downloadPng(): void {
    const svgElement = this.svgContainer.nativeElement.querySelector('svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
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
            this.triggerDownload(blob, 'text-in-circle.png');
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