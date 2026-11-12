import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TickerClientComponent } from '../../../shared/components/ticker-client/ticker-client.component';
import { PollComponent } from '../../../shared/components/poll/poll.component';
import { JiexoJumboComponent, JiexoJumboConfig } from '../../../shared/components/jiexo-jumbo/jiexo-jumbo.component';
import { ActionType, HeroComponent, HeroConfig } from '../../../shared/components/hero/hero.component';
import { Card1Component, CardConfig, CardType } from '../../../shared/components/card-1/card-1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JiexoJumboComponent, TickerClientComponent, PollComponent, HeroComponent, Card1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  typewriterList: Array<string> = ['Digital Engineering', 'Data and AI', 'Cloud'];
  private route = inject(ActivatedRoute);
  businessServices: Array<CardConfig> = [];
  aiServices: Array<CardConfig> = [];
  cv!: any;

  //#region jumbotron

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
        "icon": "bi bi-headset m-2",
        "text": "Talk to an Expert",
        "network": "LinkedIn",
        "url": "https://linkedin.com/in/mehul4ca"
      }
    ]
  }

  //#endregion

  //#region Hero
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
  //#endregion

  //#region AI section
  aiSection: CardConfig = {
    badges: [{
      "text": "AGENTIC AI"
    }],
    "css": "card-primary card-ai",
    "type": CardType.CARD,
    "title": "Intelligence That",
    "subtitle": "Takes Initiative",
    "description": "We have entered a new era of AI where systems no longer wait for commands. Agentic AI understands objectives, adapts in real-time, and takes independent actions to solve problems and seize opportunities. At JIXO Solutions, we develop AI agents designed to think ahead, enabling your business to lead."
  };

  aiService1: CardConfig = {
    "css": "card-secondary card-ai",
    "icon": "robot_2",
    "type": CardType.CARD,
    "title": "GenAI and Autonomous Agents Services",
    "description": "Design and deploy intelligent agents that reason, plan, and execute complex multi-step tasks autonomously across your business.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Learn more",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  aiService2: CardConfig = {
    "css": "card-secondary card-ai",
    "icon": "business_messages",
    "type": CardType.CARD,
    "title": "Microsoft Copilot & Copilot Studio Services",
    "description": "Build, customize and deploy Microsoft Copilots that integrate deeply with your enterprise workflows, data, and productivity tools.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Learn more",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  aiService3: CardConfig = {
    "css": "card-secondary card-ai",
    "icon": "motion_photos_auto",
    "type": CardType.CARD,
    "title": "AIOps Autonomous Operations",
    "description": "Automate IT operations with AI that continuously monitors, predicts anomalies and self-heals incidents before they impact your business.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Learn more",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  aiService4: CardConfig = {
    "css": "card-secondary card-ai",
    "icon": "verified",
    "type": CardType.CARD,
    "title": "AI Governance, Ethics & Compliance Consulting",
    "description": "Build trustworthy AI risk audits, bias detection, regulatory alignment, and enterprise AI policy governance frameworks.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Learn more",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  //#endregion

  //#region Business Section
  businessSection: CardConfig = {
    badges: [{
      "text": "WHAT WE DO"
    }],
    "css": "card-primary",
    "type": CardType.CARD,
    "title": "Innovative Services Driving",
    "subtitle": "Business Success",
    "description": "End-to-end technology services built for businesses at every stage of growth.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "All Services",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column1: CardConfig = {
    "css": "card-secondary",
    "type": CardType.CARD,
    "icon": "database",
    "title": "Data",
    "description": "Leverage diverse data sources and advanced analytics to uncover actionable insights that drive informed decision-making and strategic growth.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Data",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column2: CardConfig = {
    "css": "card-secondary",
    "type": CardType.CARD,
    "icon": "memory",
    "title": "AI & Automation",
    "description": "Implement intelligent automation and AI-driven solutions to streamline processes, enhance efficiency, and foster innovation across your organization.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore AI",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column3: CardConfig = {
    "css": "card-secondary",
    "type": CardType.CARD,
    "icon": "cloud",
    "title": "Cloud",
    "description": "Utilize flexible and secure cloud platforms that enhance agility, lower costs, and facilitate smooth digital transformation journeys.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Cloud",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column4: CardConfig = {
    "css": "card-secondary",
    "type": CardType.CARD,
    "icon": "code_xml",
    "title": "Digital Engineering",
    "description": "Enhance existing systems with cutting-edge digital engineering practices to improve performance, scalability, and user experience.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Engineering",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };

  column5: CardConfig = {
    "css": "card-secondary",
    "type": CardType.CARD,
    "icon": "headset_mic",
    "title": "Business Services",
    "description": "Streamline operations with comprehensive business services designed to ensure system stability, regulatory compliance, and continuous enhancement.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Business",
      "url": "/service",
      "icon": "bi bi-play-circle"
    }]
  };
  //#endregion

  recognitionSection: CardConfig = {
    badges: [{
      "text": "Recognition"
    }],
    "icon": "verified_user",
    "css": "card-primary",
    "type": CardType.CARD,
    "title": "Recognized for Excellence & Innovation",
    "subtitle": "",
    "description": "Our commitment to AI-driven transformation is endorsed by leading global organizations; recognized across quality, security, culture, and technology excellence.",
  };

  buildSection: HeroConfig = {
    badges: [{
      "text": "Ready to Transform Your Business?"
    }],
    "title": "Let's Build Something",
    "subtitle": "Extraordinary Together",
    "description": "From AI strategy to cloud migration, from automation to digital engineering. Our team of experts is ready to help your business lead in the intelligence era. Let’s start with a conversation.",
    "buttons": [{
      "type": ActionType.LINK,
      "text": "Explore Our Services",
      "url": "/contact",
      "icon": "bi bi-play-circle"
    }],
    "footers": [{
      "text": "15+ Years of Expertise"
    }]
  };

  ngOnInit() {
    this.cv = this.route.snapshot.data['cvData'];
    this.businessServices.push(this.column1);
    this.businessServices.push(this.column2);
    this.businessServices.push(this.column3);
    this.businessServices.push(this.column4);
    this.businessServices.push(this.column5);

    this.aiServices.push(this.aiService1);
    this.aiServices.push(this.aiService2);
    this.aiServices.push(this.aiService3);
    this.aiServices.push(this.aiService4);
  }
}