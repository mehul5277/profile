export interface ServiceMegaMenuItem {
    label: string;
    route: string;
    symbol?: string;
}

export interface ServiceMegaMenuGroup {
    title: string;
    symbol: string;
    items: ServiceMegaMenuItem[];
}

export const SERVICE_MEGA_MENU_GROUPS: ServiceMegaMenuGroup[] = [
    {
        title: 'Digital Engineering',
        symbol: 'code',
        items: [
            { label: 'API & Application Development', route: '/services/digital-engineering/api-app-dev' },
            { label: 'Cyber Security', route: '/services/digital-engineering/cyber-security' },
            { label: 'Product Engineering Services', route: '/services/digital-engineering/product-engineering' },
            { label: 'Quality Engineering & Automation', route: '/services/digital-engineering/quality-engineering' },
            { label: 'UI/UX Engineering & Modernization', route: '/services/digital-engineering/ui-ux' }
        ]
    },
    {
        title: 'AI & Automation',
        symbol: 'neurology',
        items: [
            { label: 'Responsible AI Consulting', route: '/services/ai-automation/responsible-ai' },
            { label: 'GenAI and Autonomous Agents Services', route: '/services/ai-automation/genai-agents' },
            { label: 'AIOps Autonomous Operations', route: '/services/ai-automation/aiops' },
            { label: 'AI Governance, Ethics & Compliance Consulting', route: '/services/ai-automation/ai-governance' },
            { label: 'AI and Machine Learning', route: '/services/ai-automation/ai-ml' }
        ]
    },
    {
        title: 'Data',
        symbol: 'database',
        items: [
            { label: 'Data Strategy & Analytics', route: '/services/data/strategy-analytics' },
            { label: 'Data Engineering', route: '/services/data/data-engineering' },
            { label: 'Advanced Analytics & Business Intelligence', route: '/services/data/advanced-analytics-bi' },
            { label: 'Data Governance & Compliance', route: '/services/data/governance-compliance' }
        ]
    },
    {
        title: 'Business Process Operations',
        symbol: 'business_center',
        items: [
            { label: 'Professional Services', route: '/services/business-services/professional-services' }
        ]
    },
    {
        title: 'AWS',
        symbol: 'cloud_queue',
        items: [
            { label: 'Cloud Migration', route: '/services/cloud/aws-migration' },
            { label: 'AWS Managed Services', route: '/services/cloud/aws-managed' },
            { label: 'Data Engineering & Analytics', route: '/services/cloud/aws-data' },
            { label: 'DevOps Automation', route: '/services/cloud/aws-devops' },
            { label: 'Well-Architected Review', route: '/services/cloud/aws-well-architected' },
            { label: 'Cloud Security', route: '/services/cloud/aws-security' },
            { label: 'Serverless Computing', route: '/services/cloud/aws-serverless' },
            { label: 'AWS AI', route: '/services/cloud/aws-ai' },
            { label: 'Small and Medium Business Services', route: '/services/cloud/aws-smb' },
            { label: 'Amazon EC2', route: '/services/cloud/aws-ec2' }
        ]
    },
    {
        title: 'Microsoft',
        symbol: 'grid_view',
        items: [
            { label: 'Microsoft 365 Services', route: '/services/cloud/m365' },
            { label: 'Microsoft Dynamics 365 Services', route: '/services/cloud/dynamics-365' },
            { label: 'Power Platform Services', route: '/services/cloud/power-platform' },
            { label: 'Azure Services', route: '/services/cloud/azure' },
            { label: 'Copilot & Copilot Studio Services', route: '/services/ai-automation/copilot-studio' }
        ]
    },
    {
        title: 'Cloud',
        symbol: 'cloud',
        items: [
            { label: 'Managed Cloud Services', route: '/services/cloud/managed-cloud' }
        ]
    }
];