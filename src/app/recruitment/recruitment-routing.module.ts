import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitmentNavbarComponent } from './recruitment-navbar/recruitment-navbar.component';
import { HelpComponent } from '../public/pages/help/help.component';


const recruitmentRoutes: Routes = [
  {
    path: '',
    component: RecruitmentNavbarComponent,
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
