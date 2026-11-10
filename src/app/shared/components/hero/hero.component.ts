import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdminRoutingModule } from '../../../admin/admin-routing.module';

export enum ActionType {
  LINK,     // 0
  BUTTON,   // 1
  HREF,   // 2
  URL,  // 3
}

interface BadgeInfo {
  text: string;
  icon?: string;
}

interface ButtonInfo {
  type: ActionType;
  icon: string;
  text: string;
  url: string;
}

interface FooterInfo {
  text: string;
}

export interface HeroConfig {
  icon?: string;
  title: string;
  subtitle?: string;
  description: string;
  buttons?: Array<ButtonInfo>;
  badges?: Array<BadgeInfo>;
  footers?: Array<FooterInfo>;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass, AdminRoutingModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input({ required: false }) heroConfig!: HeroConfig;
  ActionType = ActionType;
}
