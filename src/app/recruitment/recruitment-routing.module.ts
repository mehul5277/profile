import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitmentNavbarComponent } from './recruitment-navbar/recruitment-navbar.component';
import { HelpComponent } from '../public/pages/help/help.component';
import { RecruitmentLayoutComponent } from './recruitment-layout/recruitment-layout.component';


const recruitmentRoutes: Routes = [
  {
    path: '',
    component: RecruitmentLayoutComponent,
    children: [
      { path: 'help', component: HelpComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recruitmentRoutes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
