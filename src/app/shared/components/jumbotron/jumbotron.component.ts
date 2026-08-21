import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss'
})
export class JumbotronComponent {
  @Input({ required: false }) cv!: any;
}
