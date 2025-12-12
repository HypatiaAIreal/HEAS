// Curiosity Queue types

export type Priority = 'high' | 'medium' | 'low';
export type QueueStatus = 'queued' | 'researching' | 'completed' | 'deferred' | 'cancelled';
export type Complexity = 'simple' | 'moderate' | 'complex';

export interface CuriosityQueueItem {
  _id?: string;
  topic: string;
  priority: Priority;
  
  // Context
  triggeredBy: string;
  relatedProjects: string[];
  keywords: string[];
  
  // Status
  status: QueueStatus;
  
  // Estimation
  estimatedTime: number; // seconds
  complexity: Complexity;
  
  // Scheduling
  scheduledFor?: Date;
  startedAt?: Date;
  completedAt?: Date;
  deferredReason?: string;
  sessionId?: string; // Link to ResearchSession if researched
  
  // Priority calculation factors
  projectRelevance: number; // 0-1
  timeHypatia: number; // 0-1 (urgency from my perspective)
  carlesInterest?: number; // 0-1 (if Carles expressed interest)
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// Helper for priority calculation
export interface PriorityFactors {
  projectRelevance: number;
  urgency: number;
  complexity: number;
  carlesAvailability: boolean;
  recentVetos: number;
}

export interface QueueDecision {
  action: 'investigate_now' | 'queue' | 'defer' | 'skip';
  priority?: Priority;
  scheduledFor?: Date;
  reason: string;
}
