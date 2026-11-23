import { Component, Input, OnInit } from '@angular/core';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgTemplateOutlet, NgClass, NgComponentOutlet } from '@angular/common';
import { AdminRoutingModule } from '../../../admin/admin-routing.module';

interface BadgeInfo {
  text: string;
  url: string;
  icon: string;
}

interface ButtonInfo {
  icon: string;
  text: string;
  network: string;
  url: string;
}

export interface JiexoJumboConfig {
  title: string;
  subtitle: string;
  typewriterList: Array<string>;
  description: string;
  badges: Array<BadgeInfo>;
  buttons: Array<ButtonInfo>;
}

@Component({
  selector: 'app-jiexo-jumbo',
  standalone: true,
  imports: [NgTemplateOutlet, TypewriterComponent, NgClass, AdminRoutingModule],
  templateUrl: './jiexo-jumbo.component.html',
  styleUrl: './jiexo-jumbo.component.scss'
})
export class JiexoJumboComponent implements OnInit {
  @Input({ required: false }) jumbotronConfig!: JiexoJumboConfig;

  jumbotronDefaultConfig: JiexoJumboConfig = {
    title: "Building Intelligent Solutions through",
    subtitle: "for Measurable Growth",
    typewriterList: ["Artificial Intelligence", "Data Science", "Data Engineering", "Cloud Computing"],
    description: "Move beyond manual workflows. We engineer autonomous AI systems, resilient cloud architectures, and real-time data pipelines that scale with your enterprise.",
    badges: [{ "text": "Trusted Partner · Startup to Enterprise", "url": "https://linkedin.com/in/mehul4ca", "icon": "bi bi-shield-fill-check me-2" }],
    buttons: [{ "icon": "bi bi-arrow-right m-2", "text": "Explore Our Services", "network": "LinkedIn", "url": "https://linkedin.com/in/mehul4ca" }, { "icon": "bi bi-headset m-2", "text": "Talk to an Expert", "network": "LinkedIn", "url": "https://linkedin.com/in/mehul4ca" }]
  }

  ngOnInit(): void {
    this.jumbotronDefaultConfig.description = this.jumbotronConfig.description;
  }
}