import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HelpComponent } from './pages/help/help.component';

const routes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    { path: 'help', component: HelpComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
