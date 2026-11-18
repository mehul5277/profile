import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  @Input({ required: false }) tickerItems: Array<any> = [
    "./assets/img/client-11.png",
    "./assets/img/client-2.png",
    "./assets/img/client-3.png",
    "./assets/img/client-4.png",
    "./assets/img/client-9.svg",
    "./assets/img/client-7.png"
  ];
}