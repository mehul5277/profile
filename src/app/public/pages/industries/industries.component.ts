import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss'
})
export class IndustriesComponent {
  industries: any;
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.getData("services").subscribe(data => this.industries = data.industries);
  }
}
