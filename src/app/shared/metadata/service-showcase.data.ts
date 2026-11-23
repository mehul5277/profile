export type ServiceKey =
  | 'data'
  | 'ai-automation'
  | 'cloud'
  | 'digital-engineering'
  | 'business-services';

export interface ServiceCaseStudy {
  sector: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface ServiceOfferingDetail {
  key: ServiceKey;
  navLabel: string;
  icon: string;
  exploreUrl: string;
  badge: string;
  headline: string;
  overview: string;
  introduction: string;
  benefits: string[];
  howWeCanHelp: string[];
  howWeOperateSmartly: {
    title: string;
    detail: string;
  }[];
  caseStudies: ServiceCaseStudy[];
  relatedUrl: string;
  relatedLabel: string;
}

export const ALL_SERVICES_DETAIL: ServiceOfferingDetail[] = [
  {
    key: 'data',
    navLabel: 'Data',
    icon: 'database',
    exploreUrl: 'http://localhost:4200/#/services/data',
    badge: 'DATA & ANALYTICS',
    headline: 'Turn Fragmented Data Into Confident Decisions',
    overview:
      'Leverage diverse data sources and advanced analytics to uncover actionable insights that drive informed decision-making and strategic growth.',
    introduction:
      'Modern enterprises generate massive volumes of operational, transactional, and customer data across disconnected systems. We help organizations unify those sources into governed, high-trust data platforms that power faster reporting, predictive analytics, and AI readiness.',
    benefits: [
      'Faster, more confident decision-making with a single source of truth',
      'Reduced data silos across ERP, CRM, product telemetry, and cloud apps',
      'Stronger data quality, lineage, and regulatory compliance',
      'Predictable storage and compute spend as data volumes grow'
    ],
    howWeCanHelp: [
      'Modernize legacy data warehouses and lakehouses for analytical and real-time workloads.',
      'Build executive dashboards, self-service BI, and forecasting/analytics pipelines.',
      'Establish data governance, catalog standards, access controls, and automated quality checks.'
    ],
    howWeOperateSmartly: [
      {
        title: 'Metadata-Driven Ingestion',
        detail: 'Use reusable, configuration-driven ingestion templates instead of hand-coding repetitive pipelines.'
      },
      {
        title: 'Shift-Left Quality Gates',
        detail: 'Catch schema drift, freshness delays, and anomalies automatically inside pipelines before reporting.'
      },
      {
        title: 'Workload-Aware FinOps',
        detail: 'Right-size compute clusters and storage tiers to align infrastructure costs with actual usage.'
      }
    ],
    caseStudies: [
      {
        sector: 'Financial Services',
        title: 'Unified Multi-Source Reporting & Risk Analytics',
        challenge: 'Fragmented regional reporting led to slow month-end closes and conflicting KPIs.',
        solution: 'Consolidated core datasets into a governed analytics layer with standardized metric definitions.',
        outcome: 'Cut reporting cycle time from days to hours with consistent executive visibility.'
      },
      {
        sector: 'Retail & Commerce',
        title: 'Demand & Inventory Visibility Pipeline',
        challenge: 'Disconnected inventory and sales feeds caused stockouts on high-velocity SKUs.',
        solution: 'Automated near-real-time ingestion and data quality checks across warehouse and store feeds.',
        outcome: 'Improved replenishment accuracy and reduced manual spreadsheet reconciliation.'
      }
    ],
    relatedUrl: 'http://localhost:4200/#/https:/www.kyndryl.com/ca/en/consulting.html',
    relatedLabel: 'Discover JIXO Consult'
  },
  {
    key: 'ai-automation',
    navLabel: 'AI & Automation',
    icon: 'memory',
    exploreUrl: 'http://localhost:4200/#/services/ai-automation',
    badge: 'AI & AUTOMATION · AGENTIC AI',
    headline: 'Intelligence That Takes Initiative Across Workflows',
    overview:
      'Implement intelligent automation and AI-driven solutions that streamline processes, enhance efficiency, and foster innovation across your organization.',
    introduction:
      'Organizations are moving past basic chat assistants toward Agentic AI and intelligent automation that understand goals, adapt in real time, and coordinate multi-step work. We help you deploy practical AI agents, Microsoft Copilot solutions, AIOps, and governance frameworks safely.',
    benefits: [
      'Higher throughput on repetitive, multi-step operational workflows',
      'Faster resolution and proactive issue prevention via intelligent automation',
      'Practical employee productivity gains through grounded Copilot experiences',
      'Stronger oversight with clear guardrails, auditability, and compliance alignment'
    ],
    howWeCanHelp: [
      'Design and deploy GenAI and autonomous agents that plan, reason, and execute workflows.',
      'Customize Microsoft Copilot and Copilot Studio grounded in enterprise data and permissions.',
      'Implement AIOps anomaly detection and AI governance, ethics, and compliance frameworks.'
    ],
    howWeOperateSmartly: [
      {
        title: 'Bounded Agent Autonomy',
        detail: 'Pair autonomous execution with human-in-the-loop approvals for high-impact decisions.'
      },
      {
        title: 'Continuous Evaluation',
        detail: 'Benchmark prompts, retrieval accuracy, and tool execution to prevent silent model drift.'
      },
      {
        title: 'Governance Built In',
        detail: 'Enforce role-based access, data redaction, and audit logging from day one.'
      }
    ],
    caseStudies: [
      {
        sector: 'Enterprise Operations',
        title: 'Automated Service Triage & Knowledge Copilot',
        challenge: 'Support and internal request queues were bogged down by repetitive lookup and routing tasks.',
        solution: 'Deployed a workflow-aware assistant and automated triage rules grounded in approved documentation.',
        outcome: 'Accelerated first-response times and freed specialists for complex escalations.'
      },
      {
        sector: 'IT Infrastructure',
        title: 'Proactive Alert Correlation & AIOps Runbooks',
        challenge: 'High volumes of low-signal alerts slowed incident root-cause identification.',
        solution: 'Grouped correlated telemetry signals and paired common incidents with guided remediation steps.',
        outcome: 'Reduced mean time to acknowledge and improved operational consistency.'
      }
    ],
    relatedUrl: 'http://localhost:4200/#/service',
    relatedLabel: 'Explore Agentic AI'
  },
  {
    key: 'cloud',
    navLabel: 'Cloud',
    icon: 'cloud',
    exploreUrl: 'http://localhost:4200/#/services/cloud',
    badge: 'CLOUD & HYBRID IT',
    headline: 'Flexible, Resilient Cloud & Hybrid Ecosystems',
    overview:
      'Utilize flexible and secure cloud platforms that enhance agility, lower costs, and facilitate smooth digital transformation journeys.',
    introduction:
      'Most enterprises operate a mix of cloud platforms, SaaS applications, and on-premises systems. We help you design, migrate, and run resilient cloud and hybrid IT ecosystems that balance agility, security, and cost control.',
    benefits: [
      'Greater infrastructure agility and faster environment provisioning',
      'Improved resilience, high availability, and business continuity',
      'Lower total cost of ownership through right-sizing and FinOps discipline',
      'Seamless interoperability across hybrid and multi-cloud estates'
    ],
    howWeCanHelp: [
      'Plan and execute cloud migrations, workload modernization, and secure landing zones.',
      'Architect hybrid IT and multi-cloud ecosystems backed by global tech alliances.',
      'Strengthen cloud security, observability, backup/recovery, and cost governance.'
    ],
    howWeOperateSmartly: [
      {
        title: 'Infrastructure as Code',
        detail: 'Provision standardized, compliant environments from versioned code templates.'
      },
      {
        title: 'Dependency-First Waves',
        detail: 'Sequence migrations by application dependencies to minimize disruption.'
      },
      {
        title: 'Continuous FinOps',
        detail: 'Monitor unit economics, eliminate idle resources, and optimize commitments continuously.'
      }
    ],
    caseStudies: [
      {
        sector: 'Healthcare & Life Sciences',
        title: 'Compliant Cloud Landing Zone & Workload Migration',
        challenge: 'Legacy hosting limited scalability and required strict security and access baselines.',
        solution: 'Implemented an automated landing zone with identity guardrails and phased workload migration.',
        outcome: 'Standardized environment security and improved release agility across teams.'
      },
      {
        sector: 'Manufacturing',
        title: 'Hybrid Connectivity for Plant & Cloud Systems',
        challenge: 'On-site operational systems needed reliable, secure integration with cloud analytics.',
        solution: 'Established resilient hybrid networking and standardized telemetry ingestion.',
        outcome: 'Enabled dependable cross-environment operations without disrupting plant uptime.'
      }
    ],
    relatedUrl: 'http://localhost:4200/#/https:/www.kyndryl.com/ca/en/about-us/alliances.html',
    relatedLabel: 'Explore our partners'
  },
  {
    key: 'digital-engineering',
    navLabel: 'Digital Engineering',
    icon: 'code_xml',
    exploreUrl: 'http://localhost:4200/#/services/digital-engineering',
    badge: 'DIGITAL ENGINEERING',
    headline: 'Build & Modernize High-Velocity Digital Products',
    overview:
      'Design, build, and modernize scalable digital systems and applications using cutting-edge engineering practices to optimize performance and user experience.',
    introduction:
      'Competitive digital experiences depend on clean architecture, fast iteration, and reliable integration across enterprise platforms. We help teams build new applications, modernize aging software, and connect siloed systems—including with JIXO Bridge.',
    benefits: [
      'Faster time-to-market for new features and customer-facing experiences',
      'Improved application performance, responsiveness, and user satisfaction',
      'Lower maintenance burden through modular, well-tested codebases',
      'Smoother integration between core enterprise systems and modern apps'
    ],
    howWeCanHelp: [
      'Design and build scalable web applications, portals, and enterprise software platforms.',
      'Modernize legacy applications and connect disconnected systems using JIXO Bridge and APIs.',
      'Raise engineering quality with automated testing, CI/CD, accessibility, and performance tuning.'
    ],
    howWeOperateSmartly: [
      {
        title: 'Modular Component Architecture',
        detail: 'Build reusable UI components, shared services, and clear domain boundaries.'
      },
      {
        title: 'Automated CI/CD & Testing',
        detail: 'Run automated build, lint, type, and test checks on every change to protect quality.'
      },
      {
        title: 'Incremental Modernization',
        detail: 'Modernize high-friction modules step by step instead of risking big-bang rewrites.'
      }
    ],
    caseStudies: [
      {
        sector: 'B2B Platforms',
        title: 'Customer Portal Modernization & System Integration',
        challenge: 'An aging web portal and manual backend handoffs slowed customer onboarding.',
        solution: 'Re-architected the frontend with reusable components and integrated backend workflows via APIs.',
        outcome: 'Delivered a faster, more responsive user experience and cut manual processing steps.'
      },
      {
        sector: 'Logistics & Supply Chain',
        title: 'Connecting Siloed Operational Apps With JIXO Bridge',
        challenge: 'Disparate tracking and order tools created delays and data mismatches.',
        solution: 'Connected core systems through structured integration flows and standardized event contracts.',
        outcome: 'Accelerated time-to-market for new operational features with fewer integration defects.'
      }
    ],
    relatedUrl: 'http://localhost:4200/#/url%3Fid%3D27',
    relatedLabel: 'Learn about JIXO Bridge'
  },
  {
    key: 'business-services',
    navLabel: 'Business Services',
    icon: 'headset_mic',
    exploreUrl: 'http://localhost:4200/#/services/business-services',
    badge: 'BUSINESS SERVICES',
    headline: 'Operational Stability, Advisory & Managed Execution',
    overview:
      'Streamline operations with comprehensive business services designed to ensure system stability, regulatory compliance, and continuous enhancement.',
    introduction:
      'Technology delivers lasting value only when paired with clear operating models, reliable support, and disciplined execution. Our business services bridge strategy and day-to-day operations so your teams stay focused on growth.',
    benefits: [
      'Clearer alignment between technology roadmaps and business priorities',
      'Dependable post-launch stability, support responsiveness, and SLA discipline',
      'Stronger readiness for audits, security reviews, and compliance standards',
      'Reduced operational firefighting through structured root-cause resolution'
    ],
    howWeCanHelp: [
      'Provide transformation visioning, architecture advisory, and prioritized roadmaps via JIXO Consult.',
      'Deliver ongoing application/platform support, maintenance, and continuous enhancements.',
      'Streamline operational processes and support compliance and governance alignment.'
    ],
    howWeOperateSmartly: [
      {
        title: 'High-Leverage Prioritization',
        detail: 'Focus on initiatives and bottlenecks that deliver clear, measurable operational value.'
      },
      {
        title: 'Root-Cause Elimination',
        detail: 'Address underlying causes of recurring incidents rather than applying temporary patches.'
      },
      {
        title: 'Team Enablement',
        detail: 'Provide clear runbooks, documentation, and enablement so internal teams thrive.'
      }
    ],
    caseStudies: [
      {
        sector: 'Enterprise Transformation',
        title: 'Target Architecture & Phased Modernization Roadmap',
        challenge: 'Leadership needed a practical sequence to modernize core systems without halting operations.',
        solution: 'Conducted architecture assessment and defined phased delivery waves tied to business milestones.',
        outcome: 'Aligned stakeholders around a clear, lower-risk execution plan.'
      },
      {
        sector: 'Managed Operations',
        title: 'Structured Support & Continuous Service Improvement',
        challenge: 'Recurring support escalations distracted product engineers from roadmap delivery.',
        solution: 'Established tiered triage, documented runbooks, and root-cause tracking across key services.',
        outcome: 'Improved service reliability and restored engineering focus on high-value releases.'
      }
    ],
    relatedUrl: 'http://localhost:4200/#/url%3Fid%3D26',
    relatedLabel: 'Explore our services'
  }
];