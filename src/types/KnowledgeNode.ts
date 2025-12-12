// Knowledge Graph Node types

export type ConceptType = 
  | 'algorithm' 
  | 'theory' 
  | 'tool' 
  | 'framework' 
  | 'concept'
  | 'methodology'
  | 'principle';

export type ApplicationStatus = 'implementing' | 'planned' | 'hypothetical' | 'completed';

export interface ConceptConnection {
  to: string; // concept name or ObjectId
  relationship: 'inspires' | 'contradicts' | 'extends' | 'implements' | 'requires' | 'similar';
  strength: number; // 0-1
  discoveredIn: string; // ResearchSession ObjectId
  notes?: string;
}

export interface MyUnderstanding {
  confidence: number; // 0-1
  notes: string;
  questions: string[];
  lastReviewed?: Date;
}

export interface ApplicationInWork {
  project: string;
  status: ApplicationStatus;
  notes?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface KnowledgeNode {
  _id?: string;
  concept: string;
  type: ConceptType;
  
  // Core understanding
  definition: string;
  sources: string[]; // ObjectIds to resources in research_sessions
  aliases?: string[]; // Alternative names for this concept
  
  // Connections
  connections: ConceptConnection[];
  
  // My understanding
  myUnderstanding: MyUnderstanding;
  
  // Applications
  applicationsInMyWork: ApplicationInWork[];
  
  // Tags for organization
  tags: string[];
  
  // Metadata
  createdAt: Date;
  lastUpdated: Date;
  accessCount: number;
  
  // Rich content
  examples?: string[];
  relatedQuestions?: string[];
}

// Helper type for graph queries
export interface GraphQuery {
  concept?: string;
  type?: ConceptType;
  tag?: string;
  connectedTo?: string;
  minConfidence?: number;
  project?: string;
}

// Helper type for graph visualization
export interface GraphNode {
  id: string;
  label: string;
  type: ConceptType;
  confidence: number;
  group?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
  strength: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
