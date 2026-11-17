import { Component } from '@angular/core';
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

  // Helper getters for template
  get topText(): string { return this.form.get('topText')?.value || ''; }
  get middleText(): string { return this.form.get('middleText')?.value || ''; }
  get bottomText(): string { return this.form.get('bottomText')?.value || ''; }
  get fontFamily(): string { return this.form.get('fontFamily')?.value || 'Arial'; }
  get isAllCaps(): boolean { return this.form.get('isAllCaps')?.value || false; }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      topText: ['SARAH • BRAD • AMY'],
      middleText: ['WILSON'],
      bottomText: ['EST. 2020'],
      fontFamily: ['Arial'],
      isAllCaps: [false]
    });
  }

  // Splits string into characters for individual rotation transforms
  getCharacters(text: string): string[] {
    const processed = this.isAllCaps ? text.toUpperCase() : text;
    return processed.split('');
  }

  onSubmit() {
    console.log('Generator parameters:', this.form.value);
  }
}