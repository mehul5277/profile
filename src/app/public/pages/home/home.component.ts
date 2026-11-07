import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TickerClientComponent } from '../../../shared/components/ticker-client/ticker-client.component';
import { PollComponent } from '../../../shared/components/poll/poll.component';
import { JiexoJumboComponent, JiexoJumboConfig } from '../../../shared/components/jiexo-jumbo/jiexo-jumbo.component';
import { ActionType, HeroComponent, HeroConfig } from '../../../shared/components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JiexoJumboComponent, TickerClientComponent, PollComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  typewriterList: Array<string> = ['Digital Engineering', 'Data and AI', 'Cloud'];
  private route = inject(ActivatedRoute);
  cv!: any;

  jumboConfig: JiexoJumboConfig = {
    "title": "Building Intelligent Solutions through",
    "subtitle": "for Business Excellence",
    "typewriterList": ["Digital Engineering", "Artificial Intelligence", "Data Engineering", "Cloud Computing"],
    "description": "We help forward-thinking enterprises turn technology into competitive advantage through Data, Cloud, AI and Digital Engineering solutions built for scale and delivered for impact.",
    "badges": [
      {
        "text": "Trusted Partner · Startup to Enterprise",
        "url": "https://linkedin.com/in/mehul4ca",
        "icon": "bi bi-shield-fill-check me-2"
      }
    ],
    "buttons": [
      {
        "icon": "bi bi-arrow-right m-2",
        "text": "Explore Our Services",
        "network": "LinkedIn",
        "url": "https://linkedin.com/in/mehul4ca"
      },
      {
        "icon": "bi bi-robot m-2",
        "text": "Talk to an Expert",
        "network": "LinkedIn",
        "url": "https://linkedin.com/in/mehul4ca"
      }
    ]
  }


  heroConfig: HeroConfig = {
    "badges": [{
      "text": "WHAT WE DO"
    }],
    "title": "Innovative Services Driving",
    "subtitle": "Business Success",
    "description": "End-to-end technology services built for businesses at every stage of growth.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "All Services",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }],
    "footers": [{
      "text": "© 2024 Our Company. All rights reserved."
    }]
  };

  businessServices: Array<HeroConfig> = [];

  column1: HeroConfig = {
    "title": "Data",
    "description": "Leverage diverse data sources and advanced analytics to uncover actionable insights that drive informed decision-making and strategic growth.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Data Services",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column2: HeroConfig = {
    "title": "AI & Automation",
    "description": "Implement intelligent automation and AI-driven solutions to streamline processes, enhance efficiency, and foster innovation across your organization.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore AI",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column3: HeroConfig = {
    "title": "Cloud",
    "description": "Utilize flexible and secure cloud platforms that enhance agility, lower costs, and facilitate smooth digital transformation journeys.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Cloud Services",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column4: HeroConfig = {
    "title": "Digital Engineering",
    "description": "Enhance existing systems with cutting-edge digital engineering practices to improve performance, scalability, and user experience.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Engineering Services",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column5: HeroConfig = {
    "title": "Business Services",
    "description": "Streamline operations with comprehensive business services designed to ensure system stability, regulatory compliance, and continuous enhancement.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Business Services",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  ngOnInit() {
    this.cv = this.route.snapshot.data['cvData'];
    this.businessServices.push(this.column1);
    this.businessServices.push(this.column2);
    this.businessServices.push(this.column3);
    this.businessServices.push(this.column4);
    this.businessServices.push(this.column5);
  }
}