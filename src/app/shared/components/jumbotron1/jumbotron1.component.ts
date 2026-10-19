import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TypewriterComponent } from '../typewriter/typewriter.component';

export interface buttonConfig {
  text: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-jumbotron-1',
  standalone: true,
  imports: [NgTemplateOutlet, TypewriterComponent],
  templateUrl: './jumbotron1.component.html',
  styleUrl: './jumbotron1.component.scss'
})
export class Jumbotron1Component {
  typewriterList:Array<string> = ['Digital Engineering', 'Artificial Intelligence', 'Data Engineering', 'Cloud Computing'];
  @Input({ required: false }) cv!: any;
  @Input({ required: false }) btnConfig = {
    text: "Trusted Partner · Startup to Enterprise",
    url: "url",
    icon: "icon"
  };
}
