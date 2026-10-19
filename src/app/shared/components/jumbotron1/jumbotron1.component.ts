import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface buttonConfig {
  text: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-jumbotron-1',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './jumbotron1.component.html',
  styleUrl: './jumbotron1.component.scss'
})
export class Jumbotron1Component {
  @Input({ required: false }) cv!: any;
  @Input({ required: false }) btnConfig = {
    text: "Trusted Partner · Startup to Enterprise",
    url: "url",
    icon: "icon"
  };
}
