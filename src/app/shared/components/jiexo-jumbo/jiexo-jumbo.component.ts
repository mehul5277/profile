import { Component, Input } from '@angular/core';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { JsonPipe, NgTemplateOutlet, NgClass } from '@angular/common';


@Component({
  selector: 'app-jiexo-jumbo',
  standalone: true,
  imports: [NgTemplateOutlet, TypewriterComponent, JsonPipe, NgClass],
  templateUrl: './jiexo-jumbo.component.html',
  styleUrl: './jiexo-jumbo.component.scss'
})
export class JiexoJumboComponent {
  @Input({ required: false }) jumbotronConfig!: any;
  // @Input({ required: false }) jumbotronConfig: any = {
  //   typewriterList: ['Digital Engineering', 'Artificial Intelligence', 'Data Engineering', 'Cloud Computing'],
  //   title: 'Building Intelligent Solutions through',
  //   subtitle: '',
  //   description: 'We are a team of passionate engineers and designers who build intelligent solutions for our clients. We help our clients to achieve their business goals by leveraging the power of technology.',
  //   buttons: [
  //     {
  //       text: "Get Started",
  //       url: "https://example.com",
  //       icon: "ArrowRightIcon"
  //     }
  //   ]
  // };
  // @Input({ required: false }) btnConfig = {
  //   text: "Trusted Partner · Startup to Enterprise",
  //   url: "url",
  //   icon: "icon"
  // };
}