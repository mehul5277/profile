import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdminRoutingModule } from '../../../admin/admin-routing.module';


interface BadgeInfo {
  text: string;
  icon: string;
}

interface ButtonInfo {
  icon: string;
  text: string;
  url: string;
}

interface FooterInfo {
  text: string;
}


export interface HeroConfig {
  title: string;
  subtitle: string;
  description: string;
  buttons: Array<ButtonInfo>;
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
}
