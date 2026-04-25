import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { RouterOutlet, Routes } from '@angular/router';
import { CVComponent } from './pages/cv/cv.component';
const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: CVComponent },        // /
    ]
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterOutlet
  ]
})
export class PublicModule { }
