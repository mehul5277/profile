import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../../../services/meta-data.service';
import { JsonPipe } from '@angular/common';
import { EnterpriseCV } from '../../../shared/models/cv.model';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit {
  // Mock data for demonstration purposes
  resumeData: EnterpriseCV = null as any; // Initialize with null or an empty object


  constructor(private metaDataService: MetaDataService) { }

  ngOnInit(): void {
    this.metaDataService.getMetaData().subscribe(data => {
      console.log('Meta Data:', data);
      this.resumeData = data; // Update resumeData with the fetched meta data
    });
  }
}
