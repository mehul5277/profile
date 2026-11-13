import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { CVComponent } from './pages/cv/cv.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductsComponent } from './pages/products/products.component';
import { HelpComponent } from './pages/help/help.component';
import { CVResolver } from '../resolvers/cv.resolver';
import { ResumeComponent } from './pages/resume/resume.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { IndustriesComponent } from './pages/industries/industries.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { DataPageComponent } from './pages/data-page/data-page.component';
import { authGuard } from '../guards/auth.guard';
import { SubLeaseComponent } from './pages/sub-lease/sub-lease.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cv', component: CVComponent, resolve: { cvData: CVResolver }, canActivate: [authGuard] },
      { path: 'data/:id', component: DataPageComponent, canActivate: [authGuard] },
      { path: 'service', component: ServicePageComponent, canActivate: [authGuard] },
      { path: 'service/:id', component: ServicePageComponent, canActivate: [authGuard] },
      { path: 'about-us', component: AboutUsComponent, canActivate: [authGuard] },
      { path: 'company', component: CompanyPageComponent, canActivate: [authGuard] },
      { path: 'company/:id', component: CompanyPageComponent, canActivate: [authGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
      { path: 'industries', component: IndustriesComponent, canActivate: [authGuard] },
      { path: 'resume', component: ResumeComponent, canActivate: [authGuard] },
      { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
      { path: 'help', component: HelpComponent, canActivate: [authGuard] },
      { path: 'sublease', component: SubLeaseComponent, canActivate: [authGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
