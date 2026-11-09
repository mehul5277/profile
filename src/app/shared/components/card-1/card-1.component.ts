import { Component, Input } from '@angular/core';
import { HeroConfig } from '../hero/hero.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

export enum CardType {
  CARD,
  HEADER,   // 1
  FOOTER,   // 2
  HEADERFOOTER,  // 3
}

export interface CardConfig extends HeroConfig {
  type: CardType
};

@Component({
  selector: 'app-card-1',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass, RouterLink, MatIcon],
  templateUrl: './card-1.component.html',
  styleUrl: './card-1.component.scss'
})
export class Card1Component {
  @Input({ required: false }) cardConfig!: CardConfig;

  CardType = CardType;
}
