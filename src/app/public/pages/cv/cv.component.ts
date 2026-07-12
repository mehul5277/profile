import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SectionComponent, SectionType } from "../section/section.component";
import { IndustriesComponent } from "../industries/industries.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [HttpClientModule, SectionComponent, IndustriesComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit {
  private route = inject(ActivatedRoute);
  tickerItems: any | undefined;
  SectionType = SectionType;
  linkedIn = `https://linkedin.com/in/mehul4ca`;
  cv: any;
  services: any;

  /**
   *
   */
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.cv = this.route.snapshot.data['cvData'];

    this.dataService.getData("services").subscribe(data => {
      this.services = data.services.slice(0, 9);
      this.tickerItems = [...this.services];
    });
  }
}
