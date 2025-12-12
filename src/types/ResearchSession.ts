// Core types for HEAS (Hypatia Epistemological Autonomy System)

export type TriggerSource = 'conversation' | 'reading' | 'project' | 'autonomous';
export type ResearchStatus = 'planning' | 'researching' | 'synthesizing' | 'completed' | 'error' | 'vetoed';
export type AutonomyLevel = 'supervised' | 'autonomous' | 'collaborative';
export type ResourceType = 'paper' | 'article' | 'documentation' | 'video' | 'book';
export type RelationshipType = 'inspires' | 'contradicts' | 'extends' | 'implements' | 'requires';

export interface CuriosityTrigger {
  source: TriggerSource;
  topic: string;
  context: string;
  timestamp: Date;
  urgency?: number; // 0-1
}

export interface SearchQuery {
  query: string;
  timestamp: Date;
  resultsCount: number;
  toolUsed: string;
}

export interface Resource {
  type: ResourceType;
  title: string;
  url: string;
  summary: string;
  keyInsights: string[];
  relevanceScore: number; // 0-1
  savedAt: Date;
  authors?: string[];
  publicationDate?: Date;
}

export interface ResearchFindings {
  mainInsights: string[];
  connections: string[];
  surpriseLevel: number; // 0-1
  applicability: string;
  confidence: number; // 0-1
  questionsRemaining?: string[];
}

export interface CarlesResponse {
  reviewed: boolean;
  feedback?: string;
  veto: boolean;
  timestamp: Date;
  rating?: number; // 1-5
}

export interface ResearchSession {
  _id?: string;
  sessionId: string;
  
  // Trigger
  trigger: {
    source: TriggerSource;
    context: string;
    timestamp: Date;
  };
  
  // Questions
  questions: string[];
  
  // Status
  status: ResearchStatus;
  autonomyLevel: AutonomyLevel;
  
  // Research execution
  searches: SearchQuery[];
  resources: Resource[];
  
  // Synthesis
  findings: ResearchFindings;
  
  // Supervision
  notifiedCarles: boolean;
  carlesResponse?: CarlesResponse;
  
  // Metadata
  duration: number; // seconds
  resourcesAnalyzed: number;
  createdAt: Date;
  updatedAt: Date;
}
