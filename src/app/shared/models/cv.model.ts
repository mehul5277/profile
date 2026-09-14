export interface EnterpriseCV {
  profile: ProfileDetails;
  leadershipSkills: string[];
  technicalSkills: TechnicalSkillsMatrix;
  experience: ProfessionalHistory[];
  achievements: AwardDetails[];
}

export interface ProfileDetails {
  title: string;
  coreCompetencies: string[];
  education: string;
  certifications: string[];
  securityClearance: SecurityClearanceDetails;
  summaryHighlights: string[];
}

export interface SecurityClearanceDetails {
  status: string;
  authority: string;
  duration: string;
}

export interface TechnicalSkillsMatrix {
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

export interface ProfessionalHistory {
  company: string;
  location: string;
  timeline: string;
  projects: ProjectAssignment[];
}

export interface ProjectAssignment {
  projectNumber: string;
  role: string;
  client: string;
  assignmentName: string;
  details: string;
  responsibilities: string[];
  environment: string[];
}

export interface AwardDetails {
  year: string;
  description: string;
  issuer: string;
}
