import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { SectionComponent, SectionType } from "../section/section.component";
import { IndustriesComponent } from "../industries/industries.component";
import { ActivatedRoute } from '@angular/router';

import { TickerComponent } from '../../../shared/components/ticker/ticker.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [SectionComponent, IndustriesComponent,  TickerComponent, NgTemplateOutlet],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  tickerItems: any | undefined;
  SectionType = SectionType;
  linkedIn = `https://linkedin.com/in/mehul4ca`;
  cv!: any;
  services: any;


  ngOnInit() {
    this.cv = this.route.snapshot.data['cvData'];

    this.dataService.getData("services").subscribe(data => {
      this.services = data.services.slice(0, 9);
      this.tickerItems = [...this.services];
    });
  }
}
