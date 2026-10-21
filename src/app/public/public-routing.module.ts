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

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cv', component: CVComponent, resolve: { cvData: CVResolver } },
      { path: 'service/:id', component: ServicePageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'industries', component: IndustriesComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'help', component: HelpComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
