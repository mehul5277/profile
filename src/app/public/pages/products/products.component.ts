import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  services: any;

  constructor(private dataService: DataService) {


  }

  ngOnInit() {
    this.dataService.getData("services").subscribe(data => this.services = data.services.slice(0, 60));
  }
}