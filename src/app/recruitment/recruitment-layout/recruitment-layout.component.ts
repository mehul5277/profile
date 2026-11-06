import { Component } from '@angular/core';
import { RecruitmentNavbarComponent } from "../recruitment-navbar/recruitment-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recruitment-layout',
  standalone: true,
  imports:  [RouterOutlet, RecruitmentNavbarComponent],
  templateUrl: './recruitment-layout.component.html',
  styleUrl: './recruitment-layout.component.scss'
})
export class RecruitmentLayoutComponent {

}
