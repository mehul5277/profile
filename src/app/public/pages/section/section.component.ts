import { Component, Input } from '@angular/core';
export enum SectionType {
  FullStack = 'fullstack',
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
  techstack: Array<string> = [
    "assets/image/techstack.svg#azure",
    "assets/image/techstack.svg#azureai",
    "assets/image/techstack.svg#visualstudio",
    "assets/image/techstack.svg#vscode",
    "assets/image/techstack.svg#powershell",
    "assets/image/techstack.svg#net",
    "assets/image/techstack.svg#netcore",
    "assets/image/techstack.svg#swagger",
    "assets/image/techstack.svg#csharp",
    "assets/image/techstack.svg#docker",
        "assets/image/techstack.svg#amzmwebservices",
    "assets/image/techstack.svg#aws",
    "assets/image/techstack.svg#ec2",
    "assets/image/techstack.svg#elastic",
    "assets/image/techstack.svg#angular",
    "assets/image/techstack.svg#angular17",
    "assets/image/techstack.svg#css3",
    "assets/image/techstack.svg#html5",
    "assets/image/techstack.svg#js",
    "assets/image/techstack.svg#python",
    "assets/image/techstack.svg#rxjs",
    "assets/image/techstack.svg#ngrx",
    "assets/image/techstack.svg#bootstrap5",
    "assets/image/techstack.svg#sass",
    "assets/image/techstack.svg#typescript",
    "assets/image/techstack.svg#bitbucket",
    "assets/image/techstack.svg#git",
    "assets/image/techstack.svg#jquery",
    "assets/image/techstack.svg#json",
    "assets/image/techstack.svg#mongodb",
    "assets/image/techstack.svg#nginx",
    "assets/image/techstack.svg#nodejs",
    "assets/image/techstack.svg#npm",
    "assets/image/techstack.svg#postgresql",
    "assets/image/techstack.svg#postman",
    "assets/image/techstack.svg#react",
  ];
  SectionType = SectionType;

  chunkArray(arr: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
}
