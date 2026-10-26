import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { JsonPipe, NgClass } from '@angular/common';
import { Jumbotron2Component } from '../../../shared/components/jumbotron2/jumbotron2.component';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [JsonPipe, Jumbotron2Component, NgClass],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  id = input<string>();
  private router = inject(Router);
  private dataService = inject(DataService);

  serviceData: any = {};
  serviceData_V1: any = {};

  ngOnInit() {
    this.dataService.fetchPageData("pageService").subscribe((data: any) => this.serviceData = data[0]);
  }

  get jumbotronConfig() {
    return Object.assign({}, { subject: this.id() }, this.serviceData.jumbotron);
  }

  get Overview() { return this.serviceData.overview; }

  get ServiceOffering() { return this.serviceData.sections[0]; }
  get Section() { return this.serviceData.sections; }

  get Expertise() { return this.serviceData.Expertise; }

  get Banner() { return this.serviceData.banner[0]; }

  get Prisum() { return this.serviceData.prisum[0]; }

  get Prisum1() { return this.serviceData.prisum1[0]; }

  goToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
