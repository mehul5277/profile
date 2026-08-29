import { Component } from '@angular/core';
import { RecruitmentNavbarComponent } from "../recruitment-navbar/recruitment-navbar.component";

@Component({
  selector: 'app-recruitment-layout',
  standalone: true,
  imports: [RecruitmentNavbarComponent],
  templateUrl: './recruitment-layout.component.html',
  styleUrl: './recruitment-layout.component.scss'
})
export class RecruitmentLayoutComponent {

}
