export interface ServicePillar {
    icon: string;
    title: string;
    howWeHelp: string;
    howWeOperateSmartly: string;
}

export interface SmartOperatingPrinciple {
    metricOrTag: string;
    title: string;
    detail: string;
}

export interface ServiceLandingConfig {
    slug: 'data' | 'ai-automation' | 'cloud' | 'digital-engineering' | 'business-services';
    badge: string;
    title: string;
    subtitle: string;
    heroSummary: string;
    smartOperatingIntro: string;
    pillars: ServicePillar[];
    smartPrinciples: SmartOperatingPrinciple[];
    ctaLabel: string;
}

export const SERVICE_LANDING_PAGES: Record<ServiceLandingConfig['slug'], ServiceLandingConfig> = {
    data: {
        slug: 'data',
        badge: 'DATA & ANALYTICS',
        title: 'Turn Fragmented Data Into Confident Decisions',
        subtitle: 'Modern data platforms, analytics engineering, and governed pipelines built for enterprise scale.',
        heroSummary:
            'We unify siloed operational and analytical data sources so leadership and automated systems can act on trusted insights in real time.',
        smartOperatingIntro:
            'Instead of rebuilding brittle ETL scripts from scratch, we standardize ingestion templates, automate data quality checks, and enforce lineage from day one.',
        pillars: [
            {
                icon: 'database',
                title: 'Data Platform Modernization & Warehousing',
                howWeHelp:
                    'Consolidate legacy warehouses and lakehouses into a scalable, cost-predictable architecture tailored to your analytical workloads.',
                howWeOperateSmartly:
                    'Use modular ELT blueprints, automated schema drift detection, and tiered storage policies to cut compute waste.'
            },
            {
                icon: 'query_stats',
                title: 'BI, Self-Service Analytics & Decision Intelligence',
                howWeHelp:
                    'Equip teams with consistent metrics, executive dashboards, and predictive models that shorten time from question to action.',
                howWeOperateSmartly:
                    'Centralize semantic metric definitions so every report and dashboard pulls from a single governed source of truth.'
            },
            {
                icon: 'policy',
                title: 'Data Governance, Quality & Catalog',
                howWeHelp:
                    'Establish clear ownership, access controls, and regulatory compliance across sensitive enterprise datasets.',
                howWeOperateSmartly:
                    'Embed automated freshness, null-rate, and PII checks directly into CI/CD data pipelines before data reaches consumers.'
            }
        ],
        smartPrinciples: [
            {
                metricOrTag: 'AUTOMATED QUALITY',
                title: 'Shift-Left Data Validation',
                detail: 'Catch broken upstream schemas and anomalies automatically during pipeline runs rather than after executive reporting.'
            },
            {
                metricOrTag: 'REUSABLE PATTERNS',
                title: 'Metadata-Driven Ingestion',
                detail: 'Onboard new connectors through configuration and repeatable templates instead of hand-coding one-off jobs.'
            },
            {
                metricOrTag: 'COST VISIBILITY',
                title: 'Workload-Aware FinOps',
                detail: 'Right-size clusters, schedule batch vs. streaming tiers intentionally, and track unit cost per query or pipeline.'
            }
        ],
        ctaLabel: 'Discuss Your Data Roadmap'
    },

    'ai-automation': {
        slug: 'ai-automation',
        badge: 'AI & AUTOMATION · AGENTIC AI',
        title: 'Intelligence That Takes Initiative Across Your Enterprise',
        subtitle: 'Autonomous agents, Microsoft Copilot solutions, AIOps, and governed AI workflows.',
        heroSummary:
            'We help enterprises move beyond isolated experiments to practical AI and intelligent automation that streamline operations and adapt in real time.',
        smartOperatingIntro:
            'We pair goal-driven agentic workflows with human-in-the-loop checkpoints, grounding models in enterprise context while enforcing strict safety and audit controls.',
        pillars: [
            {
                icon: 'robot_2',
                title: 'GenAI & Autonomous Agents',
                howWeHelp:
                    'Design multi-step AI agents that plan, call tools, and resolve complex operational workflows across business applications.',
                howWeOperateSmartly:
                    'Constrain agent actions with deterministic guardrails, retrieval grounding, and evaluation suites before production rollout.'
            },
            {
                icon: 'business_messages',
                title: 'Microsoft Copilot & Copilot Studio',
                howWeHelp:
                    'Tailor copilots and custom extensions to your internal knowledge bases, permissions, and daily collaboration workflows.',
                howWeOperateSmartly:
                    'Respect existing identity and access boundaries so users only surface data they are authorized to view.'
            },
            {
                icon: 'motion_photos_auto',
                title: 'AIOps & Governed AI Operations',
                howWeHelp:
                    'Detect infrastructure anomalies early, automate routine remediation, and maintain compliance, ethics, and risk oversight.',
                howWeOperateSmartly:
                    'Correlate logs, metrics, and traces with automated runbooks while logging prompts, outputs, and policy decisions.'
            }
        ],
        smartPrinciples: [
            {
                metricOrTag: 'HUMAN-IN-THE-LOOP',
                title: 'Bounded Autonomy',
                detail: 'Automate high-confidence steps end-to-end while routing high-impact or low-confidence actions for approval.'
            },
            {
                metricOrTag: 'CONTINUOUS EVALS',
                title: 'Accuracy & Drift Guardrails',
                detail: 'Benchmark prompts, retrieval quality, and agent tool calls continuously so performance does not silently degrade.'
            },
            {
                metricOrTag: 'GOVERNANCE BY DESIGN',
                title: 'Policy, Privacy & Auditability',
                detail: 'Embed redaction, role-based access, and trace logs into the architecture from the first prototype.'
            }
        ],
        ctaLabel: 'Scope an AI & Automation Use Case'
    },

    cloud: {
        slug: 'cloud',
        badge: 'CLOUD & HYBRID IT',
        title: 'Resilient, Cost-Smart Cloud & Hybrid Ecosystems',
        subtitle: 'Cloud migration, modernization, landing zones, and multi-cloud operations.',
        heroSummary:
            'We enable organizations to adopt flexible, secure cloud and hybrid IT environments that accelerate delivery without spiraling infrastructure spend.',
        smartOperatingIntro:
            'We codify infrastructure, standardize security baselines, and connect legacy and cloud environments smoothly using repeatable landing zones and integration patterns.',
        pillars: [
            {
                icon: 'cloud',
                title: 'Cloud Migration & Workload Modernization',
                howWeHelp:
                    'Move mission-critical applications and platforms with minimal disruption using tailored rehost, replatform, or refactor paths.',
                howWeOperateSmartly:
                    'Group applications by dependency and business criticality to sequence waves safely and retire legacy overhead early.'
            },
            {
                icon: 'hub',
                title: 'Hybrid IT & Multi-Cloud Architecture',
                howWeHelp:
                    'Unify on-premises systems with multi-cloud environments through global tech alliances and resilient networking.',
                howWeOperateSmartly:
                    'Standardize identity, security posture, and connectivity so teams operate consistently across environments.'
            },
            {
                icon: 'tune',
                title: 'Cloud FinOps, Security & Reliability',
                howWeHelp:
                    'Protect workloads with zero-trust principles, automated failover, and continuous cost optimization.',
                howWeOperateSmartly:
                    'Automate policy enforcement, idle-resource cleanup, and commitment planning to sustain high margin efficiency.'
            }
        ],
        smartPrinciples: [
            {
                metricOrTag: 'INFRASTRUCTURE AS CODE',
                title: 'Repeatable Landing Zones',
                detail: 'Provision compliant environments from versioned templates so security and networking never rely on manual clicks.'
            },
            {
                metricOrTag: 'RESILIENCE TESTING',
                title: 'Automated Observability & Recovery',
                detail: 'Pair proactive telemetry and alerting with tested backup and failover procedures.'
            },
            {
                metricOrTag: 'CONTINUOUS FINOPS',
                title: 'Unit Economics Over Raw Spend',
                detail: 'Tie cloud consumption directly to business transactions, active users, or environments.'
            }
        ],
        ctaLabel: 'Plan Your Cloud Architecture'
    },

    'digital-engineering': {
        slug: 'digital-engineering',
        badge: 'DIGITAL ENGINEERING',
        title: 'Build & Modernize High-Velocity Digital Products',
        subtitle: 'Full-stack web and enterprise applications, APIs, modernization, and quality engineering.',
        heroSummary:
            'We design, build, and modernize scalable software platforms and customer-facing applications engineered for speed, maintainability, and great UX.',
        smartOperatingIntro:
            'We combine modular component architecture, automated testing, and CI/CD delivery pipelines so teams ship features reliably without accumulating hidden debt.',
        pillars: [
            {
                icon: 'code_xml',
                title: 'Custom Application & Platform Engineering',
                howWeHelp:
                    'Deliver responsive web portals, internal operational tools, and scalable backend services tailored to complex workflows.',
                howWeOperateSmartly:
                    'Build around shared UI components, strict typing, and clean domain boundaries for faster iteration and onboarding.'
            },
            {
                icon: 'sync_alt',
                title: 'Legacy Modernization & System Integration',
                howWeHelp:
                    'Decouple monolithic or aging systems and connect enterprise platforms seamlessly—including with JIXO Bridge.',
                howWeOperateSmartly:
                    'Use incremental strangler patterns and contract-first APIs so you modernize in slices rather than risky big-bang cutovers.'
            },
            {
                icon: 'speed',
                title: 'Performance, Security & Quality Automation',
                howWeHelp:
                    'Ensure fast load times, accessible interfaces, and dependable releases across browsers and devices.',
                howWeOperateSmartly:
                    'Automate unit, integration, and regression checks in pull requests to catch defects before QA bottlenecks.'
            }
        ],
        smartPrinciples: [
            {
                metricOrTag: 'MODULAR DESIGN',
                title: 'Composable UI & Service Layers',
                detail: 'Reuse proven patterns, design tokens, and shared services across modules to keep interfaces cohesive.'
            },
            {
                metricOrTag: 'AUTOMATED DELIVERY',
                title: 'CI/CD & Fast Feedback Loops',
                detail: 'Keep builds, lint/type checks, and deployments automated so every release is predictable and reversible.'
            },
            {
                metricOrTag: 'INCREMENTAL CHANGE',
                title: 'Low-Risk Modernization',
                detail: 'Deliver visible business value early while progressively refactoring high-friction bottlenecks.'
            }
        ],
        ctaLabel: 'Start a Digital Engineering Discussion'
    },

    'business-services': {
        slug: 'business-services',
        badge: 'BUSINESS SERVICES & CONSULTING',
        title: 'Operational Excellence, Advisory & Managed Execution',
        subtitle: 'Transformation advisory, process optimization, compliance alignment, and ongoing support.',
        heroSummary:
            'We align technology initiatives with business outcomes—combining strategic consulting, streamlined operations, and dependable support across the lifecycle.',
        smartOperatingIntro:
            'We focus on high-leverage bottlenecks first, document clear operating playbooks, and measure progress by business outcomes rather than activity volume.',
        pillars: [
            {
                icon: 'architecture',
                title: 'Transformation Visioning & Solution Advisory',
                howWeHelp:
                    'Translate business goals into practical roadmaps, target architectures, and prioritized investment waves.',
                howWeOperateSmartly:
                    'Validate feasibility early with pragmatic architecture blueprints and clear success criteria before full scale-up.'
            },
            {
                icon: 'headset_mic',
                title: 'Managed Operations & Enterprise Support',
                howWeHelp:
                    'Maintain system stability, responsive issue resolution, and continuous service improvements after launch.',
                howWeOperateSmartly:
                    'Use tiered escalation, knowledge bases, and root-cause tracking so recurring issues are eliminated at the source.'
            },
            {
                icon: 'gavel',
                title: 'Process Optimization & Compliance Readiness',
                howWeHelp:
                    'Simplify cross-functional workflows and maintain auditability, security alignment, and operational consistency.',
                howWeOperateSmartly:
                    'Standardize handoffs and eliminate manual re-entry across teams and tools.'
            }
        ],
        smartPrinciples: [
            {
                metricOrTag: 'OUTCOME-FIRST',
                title: 'High-ROI Prioritization',
                detail: 'Focus effort where operational friction is highest and business impact is measurable.'
            },
            {
                metricOrTag: 'REPEATABLE PLAYBOOKS',
                title: 'Knowledge Transfer & Enablement',
                detail: 'Document runbooks, architecture decisions, and workflows so your internal teams gain long-term autonomy.'
            },
            {
                metricOrTag: 'CONTINUOUS IMPROVEMENT',
                title: 'Root-Cause Over Firefighting',
                detail: 'Turn recurring support tickets and operational delays into permanent structural fixes.'
            }
        ],
        ctaLabel: 'Connect With Our Advisory Team'
    }
};