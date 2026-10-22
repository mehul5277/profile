import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { JsonPipe } from '@angular/common';
import { Jumbotron2Component } from '../../../shared/components/jumbotron2/jumbotron2.component';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [JsonPipe, Jumbotron2Component],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  id = input<string>();
  private router = inject(Router);
  private dataService = inject(DataService);

  serviceData: any;

  ngOnInit() {

    this.dataService.getData("pages").subscribe((data: any) => this.serviceData = data);
  }

  get jumbotronConfig() {
    return Object.assign({}, { subject: this.id() }, this.serviceData[0].jumbotron);
  }

  goToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
