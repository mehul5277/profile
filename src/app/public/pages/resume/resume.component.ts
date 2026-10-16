import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../../../services/meta-data.service';
import { JsonPipe, NgTemplateOutlet, CommonModule, TitleCasePipe } from '@angular/common';
import { EnterpriseCV } from '../../../shared/models/cv.model';
import { CamelCaseToSpacesPipe } from '../../../shared/pipes/camel-case-to-spaces.pipe';
import { PosterComponent } from '../../../shared/components/poster/poster.component';


@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [JsonPipe, NgTemplateOutlet, CommonModule, CamelCaseToSpacesPipe, TitleCasePipe, PosterComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit {
  // Mock data for demonstration purposes
  resumeData: EnterpriseCV = null as any; // Initialize with null or an empty object
  public isArray = Array.isArray;

  jumbotronData = {
    title: 'Hi. I\'m <b>Mehul Patel</b>.',
    description: 'Microsoft certified senior software consultant with 15+ years of professional experience designing, developing & maintaining web & mobile applications.',
    imageUrl: 'assets/image/dp.jpg', // Replace with your actual image path
    profiles: [
      {
        network: 'LinkedIn',
        url: 'https://www.linkedin.com/in/your-profile' // Replace with your actual LinkedIn profile URL
      }
    ]
  };

  constructor(private metaDataService: MetaDataService
  ) { }

  ngOnInit(): void {
    this.metaDataService.getMetaData().subscribe(data => {
      console.log('Meta Data:', data);
      this.resumeData = data; // Update resumeData with the fetched meta data
    });
  }
}
