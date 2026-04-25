import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SectionComponent, SectionType } from "../section/section.component";
import { IndustriesComponent } from "../industries/industries.component";

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [HttpClientModule, SectionComponent, IndustriesComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit {
  SectionType = SectionType;
  linkedIn = `https://linkedin.com/in/mehul4ca`;
  cv: any = {
    "basics": {
      "name": "Mehul Patel",
      "displayName": "Mehul P.",
      "label": "Software Developer",
      "email": "mehul****@hotmail.com",
      "phone": "(912) 555-4321",
      "headline": "AI-Powered Software Development",
      "summary": "Your Ultimate Partner for World-Class Software Development, IT Consulting and Digital Transformation.",
      "about": [
        "Integrating heterogeneous enterprise systems, using diverse platforms, frameworks, design approaches, architectural styles, programming languages and cloud computing technology. Expert in mission-oriented technology solutions & dedicated to delivering technology solution.",
        "With over 10 years of experience in software development, I specialize in creating innovative solutions that drive business success. My expertise spans across various industries, including finance, healthcare, and e-commerce. I am passionate about leveraging the latest technologies to deliver high-quality software that meets the unique needs of each client."],
      "location": { "city": "San Francisco", "countryCode": "US" },
      "picture": "assets/image/dp.jpg",
      "profiles": [{ "network": "LinkedIn", "url": "https://linkedin.com/in/mehul4ca" }]
    },
    "work": [{
      "name": "Company ABC",
      "position": "Senior Developer",
      "startDate": "2019-01-01",
      "summary": "Led the development of scalable cloud-based services."
    }],
    "education": [{
      "institution": "University of Technology",
      "area": "Computer Science",
      "studyType": "Bachelor",
      "score": "3.8"
    }],
    "skills": [{
      "name": "Web Development",
      "keywords": ["HTML", "CSS", "JavaScript", "JSON"]
    }]
  };
  services: any;

  /**
   *
   */
  constructor(private dataService: DataService) {


  }

  ngOnInit() {
    this.dataService.getData("services").subscribe(data => this.services = data.services.slice(0, 60));
  }
}
