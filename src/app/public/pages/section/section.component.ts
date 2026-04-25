import { Component, Input } from '@angular/core';
export enum SectionType {
  Technologies = 'technologies',
  TechnologiesSM = 'technologies-sm',
  TechnologiesMD = 'technologies-md',
  Experience = 'experience',
  Education = 'education',
  Projects = 'projects',
  Skills = 'skills',
  Database = 'database',
  Cloud = 'cloud',
  DevOps = 'devops',
  Industries = 'industries',
}

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input() section: SectionType = SectionType.Technologies;
  SectionType = SectionType;
}
