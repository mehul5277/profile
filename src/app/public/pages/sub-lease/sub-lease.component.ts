import { Component } from '@angular/core';
import { DataCountDirective } from '../../../shared/directives/data-count.directive';

@Component({
  selector: 'app-sub-lease',
  standalone: true,
  imports: [DataCountDirective],
  templateUrl: './sub-lease.component.html',
  styleUrl: './sub-lease.component.scss'
})
export class SubLeaseComponent {

}
