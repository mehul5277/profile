import { Component, Input } from '@angular/core';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgTemplateOutlet, NgClass } from '@angular/common';

interface BadgeInfo {
  text: string;
  url: string;
  icon: string;
}

interface ButtonInfo {
  icon: string;
  text: string;
  network: string;
  url: string;
}

export interface JiexoJumboConfig {
  title: string;
  subtitle: string;
  typewriterList: Array<string>;
  description: string;
  badges: Array<BadgeInfo>;
  buttons: Array<ButtonInfo>;
}

@Component({
  selector: 'app-jiexo-jumbo',
  standalone: true,
  imports: [NgTemplateOutlet, TypewriterComponent, NgClass],
  templateUrl: './jiexo-jumbo.component.html',
  styleUrl: './jiexo-jumbo.component.scss'
})
export class JiexoJumboComponent {
  @Input({ required: false }) jumbotronConfig!: JiexoJumboConfig;
}