import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../../../services/meta-data.service';
import { JsonPipe, NgTemplateOutlet, CommonModule, TitleCasePipe } from '@angular/common';
import { EnterpriseCV } from '../../../shared/models/cv.model';
import { CamelCaseToSpacesPipe } from '../../../shared/pipes/camel-case-to-spaces.pipe';


@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [JsonPipe, NgTemplateOutlet, CommonModule, CamelCaseToSpacesPipe, TitleCasePipe],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit {
  // Mock data for demonstration purposes
  resumeData: EnterpriseCV = null as any; // Initialize with null or an empty object
  public isArray = Array.isArray;


  constructor(private metaDataService: MetaDataService
  ) { }

  ngOnInit(): void {
    this.metaDataService.getMetaData().subscribe(data => {
      console.log('Meta Data:', data);
      this.resumeData = data; // Update resumeData with the fetched meta data
    });
  }
}
