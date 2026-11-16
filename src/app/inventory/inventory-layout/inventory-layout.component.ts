import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryNavbarComponent } from '../inventory-navbar/inventory-navbar.component';

@Component({
  selector: 'app-inventory-layout',
  standalone: true,
  imports: [RouterOutlet, InventoryNavbarComponent],
  templateUrl: './inventory-layout.component.html',
  styleUrl: './inventory-layout.component.scss'
})
export class InventoryLayoutComponent {

}
