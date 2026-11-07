import { Component, Input } from '@angular/core';
import { HeroConfig } from '../hero/hero.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface CardConfig extends HeroConfig {

};

@Component({
  selector: 'app-card-1',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass, RouterLink],
  templateUrl: './card-1.component.html',
  styleUrl: './card-1.component.scss'
})
export class Card1Component {
  @Input({ required: false }) cardConfig!: CardConfig;
}
