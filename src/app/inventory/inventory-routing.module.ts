import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryLayoutComponent } from './inventory-layout/inventory-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: InventoryLayoutComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
