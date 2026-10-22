import { Component, input, Input } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

export interface Jumbotron2Config {
  backdrop: string
  subject: string
  title: string
  subTitle: string
  leadText: string
  button: Button
}

export interface Button {
  text: string
  url: string | Array<string>
  icon: string
}

@Component({
  selector: 'app-jumbotron2',
  standalone: true,
  imports: [NgClass, UpperCasePipe],
  templateUrl: './jumbotron2.component.html',
  styleUrl: './jumbotron2.component.scss'
})
export class Jumbotron2Component {
  // Option A: Provide a full default object matching the type
  jumbotron2Config = input<Jumbotron2Config>({
    backdrop: "bg-midnight grid-midnight",
    subject: "data",
    title: "Data Foundations Built for Measurable Business Impact",
    subTitle: "Design governed, scalable data platforms that turn strategy into trusted insights, operational efficiency, and AI-ready capabilities.",
    leadText: "Design governed, scalable data platforms that turn strategy into trusted insights, operational efficiency, and AI-ready capabilities.",
    button: {
      text: "Start Conversation",
      url: "",
      icon: ""
    }
  });

  // Option B: If the input is allowed to be empty initially
  // configOptional = input<Jumbotron2Config | null>(null);
}