import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitmentNavbarComponent } from './recruitment-navbar/recruitment-navbar.component';
import { HelpComponent } from '../public/pages/help/help.component';
import { RecruitmentLayoutComponent } from './recruitment-layout/recruitment-layout.component';
import { JobsComponent } from './pages/jobs/jobs.component';


const recruitmentRoutes: Routes = [
  {
    path: '',
    component: RecruitmentLayoutComponent,
    children: [
      { path: 'sourcing', component: JobsComponent },
      { path: 'review', component: JobsComponent },
      { path: 'screening', component: JobsComponent },
      { path: 'notes', component: JobsComponent },
      { path: 'reports', component: JobsComponent },
      { path: 'fillmore', component: JobsComponent },
      { path: 'help', component: HelpComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recruitmentRoutes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
