import { Component } from '@angular/core';
import { BillboardConfig } from '../jiexo-billboard/jiexo-billboard.component';

@Component({
  selector: 'app-jiexo-billboard-1',
  standalone: true,
  imports: [],
  templateUrl: './jiexo-billboard-1.component.html',
  styleUrl: './jiexo-billboard-1.component.scss'
})
export class JiexoBillboard1Component {
  billboardCofig: BillboardConfig = {
    "tagline": "powering what’s next",
    "headline": "Journey In eXponential Optimization",
    "subtitle": "Innovation • Speed • Simplicity"
  }
}
