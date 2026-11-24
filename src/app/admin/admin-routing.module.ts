import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HelpComponent } from './pages/help/help.component';
import { ServicesCatalogAdminComponent } from './pages/services-catalog-admin/services-catalog-admin.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';

const routes: Routes = [
  // { path: '', redirectTo: 'adminLayout', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent },
            { path: 'bookmark', component: BookmarkComponent },
      { path: 'help', component: HelpComponent },
      { path: 'services-catalog', component: ServicesCatalogAdminComponent },

    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
