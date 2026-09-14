export interface EnterpriseResume {
    profile: ProfileBasics;
    skills: TechnicalSkills;
    experience: ProfessionalExperience[];
    achievements: Award[];
}

export interface ProfileBasics {
    name: string;
    roles: string[];
    education: string;
    certifications: string[];
    securityClearance: SecurityClearance;
    summaryHighlights: string[];
}

export interface SecurityClearance {
    status: string;
    authority: string;
    duration: string;
}

export interface TechnicalSkills {
    operatingSystems: string[];
    development: string[];
    cloudCiCdRepository: string[];
    searchAnalyticsEngine: string[];
    database: string[];
    webServersExtensions: string[];
    security: string[];
    tools: string[];
    thirdPartyTools: string[];
    webFrameworks: string[];
    others: string[];
}

export interface ProfessionalExperience {
    company: string;
    location: string;
    timeline: string;
    projects: ProjectDetail[];
}

export interface ProjectDetail {
    projectNumber: string;
    role: string;
    client: string;
    assignmentName: string;
    details: string;
    responsibilities: string[];
    environment: string[];
}

export interface Award {
    year: string;
    description: string;
    issuer: string;
}
