import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { JsonPipe, NgClass } from '@angular/common';
import { Jumbotron2Component } from '../../../shared/components/jumbotron2/jumbotron2.component';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [JsonPipe, Jumbotron2Component, NgClass, RouterLink],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  id = input<string>();
  private router = inject(Router);
  private dataService = inject(DataService);

  serviceData: Array<any> = [];

  ngOnInit() {

    this.dataService.getData("pages").subscribe((data: any) => this.serviceData = data);
  }

  get jumbotronConfig() {
    return Object.assign({}, { subject: this.id() }, this.serviceData[0].jumbotron);
  }

  get Overview() { return this.serviceData[0].overview; }

  get ServiceOffering() { return this.serviceData[0].sections.filter((o: any) => o.title == "Service Offerings")[0]; }

  get Expertise() { return this.serviceData[0].Expertise; }

  goToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
