import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.scss'
})
export class PublicNavbarComponent implements OnInit {
  services: any;
  /**
   *
   */
  constructor(private dataService: DataService) {


  }
  ngOnInit(): void {
    this.dataService.getData("services").subscribe(data => this.services = data.services.slice(0, 12));
  }
}
