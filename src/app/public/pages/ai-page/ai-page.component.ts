import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';






interface AiCapability {
  icon: string;
  badge: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

interface AutomationPillar {
  step: string;
  title: string;
  summary: string;
  linkText: string;
  linkUrl: string;
}

@Component({
  selector: 'app-ai-page',
  standalone: true,
  imports: [],
  templateUrl: './ai-page.component.html',
  styleUrl: './ai-page.component.scss'
})
export class AiPageComponent {
  capabilities: AiCapability[] = [
    {
      icon: 'robot_2',
      badge: 'AUTONOMOUS SYSTEMS',
      title: 'GenAI & Autonomous Agents',
      description:
        'Design and deploy intelligent agents that reason, plan, and execute complex multi-step workflows across enterprise systems.',
      linkText: 'Explore Agents',
      linkUrl: 'http://localhost:4200/#/service'
    },
    {
      icon: 'business_messages',
      badge: 'ENTERPRISE WORKFLOWS',
      title: 'Microsoft Copilot & Copilot Studio',
      description:
        'Build, customize, and govern copilots grounded in your proprietary data and integrated into everyday productivity tools.',
      linkText: 'See Copilot Solutions',
      linkUrl: 'http://localhost:4200/#/service'
    },
    {
      icon: 'motion_photos_auto',
      badge: 'RESILIENT INFRASTRUCTURE',
      title: 'AIOps Autonomous Operations',
      description:
        'Predict anomalies, correlate telemetry in real time, and trigger automated remediation before incidents disrupt operations.',
      linkText: 'View AIOps Capabilities',
      linkUrl: 'http://localhost:4200/#/service'
    },
    {
      icon: 'verified',
      badge: 'TRUST & COMPLIANCE',
      title: 'AI Governance, Ethics & Compliance',
      description:
        'Establish policy guardrails, audit model risk, detect bias, and maintain regulatory alignment across every AI deployment.',
      linkText: 'Review Governance',
      linkUrl: 'http://localhost:4200/#/service'
    }
  ];

  pillars: AutomationPillar[] = [
    {
      step: '01',
      title: 'Vision & Readiness',
      summary:
        'Assess data maturity, prioritize high-ROI automation use cases, and define target agentic architecture.',
      linkText: 'Discover JIXO Consult',
      linkUrl: 'http://localhost:4200/#/https:/www.kyndryl.com/ca/en/consulting.html'
    },
    {
      step: '02',
      title: 'Engineering & Orchestration',
      summary:
        'Connect siloed enterprise applications and accelerate delivery using scalable pipelines and JIXO Bridge.',
      linkText: 'Learn about JIXO Bridge',
      linkUrl: 'http://localhost:4200/#/url%3Fid%3D27'
    },
    {
      step: '03',
      title: 'Hybrid Scale & Governance',
      summary:
        'Run workloads securely across multi-cloud environments with continuous observability and compliance controls.',
      linkText: 'Explore our partners',
      linkUrl: 'http://localhost:4200/#/https:/www.kyndryl.com/ca/en/about-us/alliances.html'
    }
  ];
}