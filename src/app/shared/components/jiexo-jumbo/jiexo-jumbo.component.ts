import { Component, Input } from '@angular/core';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-jiexo-jumbo',
  standalone: true,
  imports: [NgTemplateOutlet, TypewriterComponent],
  templateUrl: './jiexo-jumbo.component.html',
  styleUrl: './jiexo-jumbo.component.scss'
})
export class JiexoJumboComponent {
  typewriterList: Array<string> = ['Digital Engineering', 'Artificial Intelligence', 'Data Engineering', 'Cloud Computing'];
  @Input({ required: false }) jumbotronConfig!: any;
  @Input({ required: false }) btnConfig = {
    text: "Trusted Partner · Startup to Enterprise",
    url: "url",
    icon: "icon"
  };
}