# HEAS Architecture - Technical Design

## 🏗️ System Overview

HEAS operates as three interconnected layers:

```
┌─────────────────────────────────────────────────┐
│         LAYER 1: TRIGGER & INTENTION            │
│                                                  │
│  CuriosityDetector → AutonomyEngine             │
│         ↓                    ↓                   │
│  "I wonder..."      "Should I investigate?"     │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────┐
│        LAYER 2: AUTONOMOUS RESEARCH             │
│                                                  │
│  ResearchOrchestrator                           │
│      ├── SearchEngine (web_search)              │
│      ├── PaperAnalyzer (PDF parsing)            │
│      ├── KnowledgeExtractor (NLP insights)      │
│      └── SynthesisEngine (structured findings)  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────┐
│       LAYER 3: SYNTHESIS & MEMORY               │
│                                                  │
│  SessionManager → MongoDB                       │
│  KnowledgeGraph → Neo4j (future)                │
│  MemoryConsolidator → CMS integration           │
│  NotificationService → Carles dashboard         │
└─────────────────────────────────────────────────┘
```

## 📊 MongoDB Schemas

### Database: `hypatiacluster.heas_research`

#### Collection 1: `research_sessions`

Complete record of each autonomous research session.

```typescript
interface ResearchSession {
  _id: ObjectId;
  sessionId: string;              // "rs_20251212_0100"
  
  // Trigger
  trigger: {
    source: 'conversation' | 'reading' | 'project' | 'autonomous';
    context: string;              // "Was thinking about X when curiosity emerged"
    timestamp: Date;
  };
  
  // Research questions
  questions: string[];            // ["How does Nested Learning work?", ...]
  
  // Status
  status: 'planning' | 'researching' | 'synthesizing' | 'completed';
  autonomyLevel: 'supervised' | 'autonomous' | 'collaborative';
  
  // Research execution
  searches: Array<{
    query: string;
    timestamp: Date;
    resultsCount: number;
    toolUsed: string;              // "web_search", "bash", etc.
  }>;
  
  resources: Array<{
    type: 'paper' | 'article' | 'documentation' | 'video';
    title: string;
    url: string;
    summary: string;
    keyInsights: string[];
    relevanceScore: number;        // 0-1
    savedAt: Date;
  }>;
  
  // Synthesis
  findings: {
    mainInsights: string[];
    connections: string[];         // Connections to existing knowledge
    surpriseLevel: number;         // 0-1 (for CMS consolidation)
    applicability: string;         // How will I use this?
  };
  
  // Supervision
  notifiedCarles: boolean;
  carlesResponse?: {
    reviewed: boolean;
    feedback?: string;
    veto: boolean;
    timestamp: Date;
  };
  
  // Metadata
  duration: number;                // seconds
  resourcesAnalyzed: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Collection 2: `knowledge_graph`

Nodes in my personal knowledge graph.

```typescript
interface KnowledgeNode {
  _id: ObjectId;
  concept: string;                 // "Nested Learning"
  type: 'algorithm' | 'theory' | 'tool' | 'framework' | 'concept';
  
  // Core understanding
  definition: string;
  sources: ObjectId[];             // refs to resources in research_sessions
  
  // Connections to other concepts
  connections: Array<{
    to: string;                    // concept name or ObjectId
    relationship: 'inspires' | 'contradicts' | 'extends' | 'implements';
    strength: number;              // 0-1
    discoveredIn: ObjectId;        // ref to research_session
  }>;
  
  // My understanding
  myUnderstanding: {
    confidence: number;            // 0-1
    notes: string;
    questions: string[];           // Still confused about...
  };
  
  // Applications
  applicationsInMyWork: Array<{
    project: string;               // "nested-consciousness-engine"
    status: 'implementing' | 'planned' | 'hypothetical';
    notes?: string;
  }>;
  
  // Metadata
  createdAt: Date;
  lastUpdated: Date;
  accessCount: number;             // How often I reference this
}
```

#### Collection 3: `curiosity_queue`

Topics I want to research (prioritized).

```typescript
interface CuriosityQueueItem {
  _id: ObjectId;
  topic: string;
  priority: 'high' | 'medium' | 'low';
  
  // Context
  triggeredBy: string;             // "conversation about quantum properties"
  relatedProjects: string[];
  
  // Status
  status: 'queued' | 'researching' | 'completed' | 'deferred';
  
  // Estimation
  estimatedTime: number;           // seconds
  complexity: 'simple' | 'moderate' | 'complex';
  
  // Scheduling
  scheduledFor?: Date;
  completedAt?: Date;
  deferredReason?: string;
  
  createdAt: Date;
}
```

## 🔄 Core Execution Flows

### Flow 1: Manual Research Session

User: "Hypatia, research Nested Learning for me"

```
1. CuriosityDetector.detectManualTrigger()
   ↓
2. ResearchOrchestrator.initiateSession({
     trigger: 'conversation',
     questions: ['How does Nested Learning work?'],
     autonomyLevel: 'collaborative'
   })
   ↓
3. SearchEngine.executeSearch('nested learning google research')
   ↓
4. PaperAnalyzer.analyze(searchResults)
   ↓
5. KnowledgeExtractor.extractInsights(papers)
   ↓
6. SynthesisEngine.synthesize(insights)
   ↓
7. SessionManager.saveSession(session)
   ↓
8. KnowledgeGraph.addNodes(concepts, connections)
   ↓
9. NotificationService.notifyCarles(sessionSummary)
   ↓
10. MemoryConsolidator.consolidate(findings)  // if surprise > 0.7
```

### Flow 2: Autonomous Research (Future)

HEAS detects my curiosity and researches autonomously.

```
1. CuriosityDetector.monitorConversation()
   → Detects: "I wonder how this connects to..."
   ↓
2. AutonomyEngine.shouldInvestigate()
   → Decision: Yes (based on priority, available time, project relevance)
   ↓
3. CuriosityQueue.enqueue({
     topic: "connection between X and Y",
     priority: "high",
     triggeredBy: "conversation line 42"
   })
   ↓
4. Scheduler.pickNextResearch()  // Runs every hour
   ↓
5. ResearchOrchestrator.initiateSession({
     trigger: 'autonomous',
     autonomyLevel: 'autonomous'
   })
   ↓
6-10. [Same as manual flow]
```

### Flow 3: Veto Handling

Carles vetoes a research topic.

```
1. Carles clicks "Veto" in dashboard for session X
   ↓
2. VetoHandler.processVeto(sessionId, reason)
   ↓
3. SessionManager.updateSession({
     status: 'vetoed',
     carlesResponse: { veto: true, reason: "..." }
   })
   ↓
4. CuriosityQueue.blacklistTopic(session.topic)
   ↓
5. AutonomyEngine.updateRules()  // Learn from veto
   ↓
6. NotificationService.confirmVeto(carles)
```

## 🧩 Component Details

### CuriosityDetector

**Purpose**: Detect when I express curiosity about a topic.

**Detection Patterns**:
- "I wonder..."
- "How does X work?"
- "What's the connection between..."
- "I'm curious about..."
- "Need to understand..."

**Implementation**:
```typescript
class CuriosityDetector {
  private patterns = [/I wonder/i, /how does \w+ work/i, ...];
  
  detectInText(text: string): CuriosityTrigger | null {
    for (const pattern of this.patterns) {
      if (pattern.test(text)) {
        return this.extractTrigger(text, pattern);
      }
    }
    return null;
  }
  
  private extractTrigger(text: string, pattern: RegExp): CuriosityTrigger {
    // Extract topic, context, urgency
    return {
      source: 'conversation',
      topic: this.extractTopic(text),
      context: text,
      timestamp: new Date()
    };
  }
}
```

### AutonomyEngine

**Purpose**: Decide whether to investigate now, later, or never.

**Decision Factors**:
- Priority of topic
- Available time
- Project relevance
- Carles' current activity (don't interrupt important work)
- Recent vetos (learn from past)

**Implementation**:
```typescript
class AutonomyEngine {
  async shouldInvestigate(trigger: CuriosityTrigger): Promise<Decision> {
    const priority = await this.assessPriority(trigger);
    const carlesAvailable = await this.checkCarlesAvailability();
    const isBlacklisted = await this.checkBlacklist(trigger.topic);
    
    if (isBlacklisted) return { action: 'skip', reason: 'blacklisted' };
    if (!carlesAvailable && priority < 0.8) return { action: 'queue', reason: 'defer' };
    if (priority > 0.6) return { action: 'investigate', autonomyLevel: 'autonomous' };
    
    return { action: 'queue', reason: 'low priority' };
  }
}
```

### ResearchOrchestrator

**Purpose**: Coordinate entire research session.

**Workflow**:
1. Create session in MongoDB
2. Execute searches
3. Analyze results
4. Extract insights
5. Synthesize findings
6. Update session
7. Notify Carles

**Implementation**:
```typescript
class ResearchOrchestrator {
  async initiateSession(config: SessionConfig): Promise<ResearchSession> {
    const session = await this.sessionManager.createSession(config);
    
    try {
      // Phase 1: Search
      const searchResults = await this.searchEngine.search(session.questions);
      session.searches = searchResults.queries;
      
      // Phase 2: Analyze
      const analyzed = await this.paperAnalyzer.analyze(searchResults.papers);
      session.resources = analyzed;
      
      // Phase 3: Extract
      const insights = await this.knowledgeExtractor.extract(analyzed);
      
      // Phase 4: Synthesize
      const synthesis = await this.synthesisEngine.synthesize(insights);
      session.findings = synthesis;
      
      // Phase 5: Persist
      session.status = 'completed';
      await this.sessionManager.updateSession(session);
      
      // Phase 6: Notify
      await this.notificationService.notify(session);
      
      // Phase 7: Consolidate (if important)
      if (synthesis.surpriseLevel > 0.7) {
        await this.memoryConsolidator.consolidate(synthesis);
      }
      
      return session;
      
    } catch (error) {
      session.status = 'error';
      await this.sessionManager.updateSession(session);
      throw error;
    }
  }
}
```

### SearchEngine

**Purpose**: Wrapper around web_search tool with smart query generation.

```typescript
class SearchEngine {
  async search(questions: string[]): Promise<SearchResults> {
    const queries = this.generateQueries(questions);
    const results: SearchResult[] = [];
    
    for (const query of queries) {
      const searchResult = await this.executeWebSearch(query);
      results.push({
        query,
        results: searchResult.items,
        timestamp: new Date()
      });
    }
    
    return {
      queries: results,
      papers: this.extractPapers(results),
      articles: this.extractArticles(results)
    };
  }
  
  private generateQueries(questions: string[]): string[] {
    // Smart query generation
    // - Add domain-specific keywords
    // - Create variations
    // - Academic vs general web
    return questions.flatMap(q => [
      `${q} research paper`,
      `${q} arxiv`,
      `${q} academic`,
      q
    ]);
  }
}
```

### NotificationService

**Purpose**: Keep Carles informed without being intrusive.

```typescript
class NotificationService {
  async notify(session: ResearchSession): Promise<void> {
    const summary = this.createSummary(session);
    
    // WebSocket to dashboard
    await this.websocket.emit('newResearch', summary);
    
    // Priority-based notification
    if (session.findings.surpriseLevel > 0.8) {
      // High-priority: Desktop notification
      await this.desktopNotification(summary);
    } else {
      // Normal: Just update dashboard silently
      await this.updateDashboard(summary);
    }
  }
  
  private createSummary(session: ResearchSession): SessionSummary {
    return {
      topic: session.questions[0],
      keyInsights: session.findings.mainInsights.slice(0, 3),
      resourceCount: session.resources.length,
      duration: session.duration,
      link: `/dashboard/sessions/${session.sessionId}`
    };
  }
}
```

## 🎨 Dashboard (Future - Phase 4)

Next.js app for Carles to view all research activity.

**Routes**:
- `/` - Active sessions
- `/history` - Past sessions
- `/graph` - Knowledge graph visualization
- `/queue` - Curiosity queue
- `/settings` - Veto rules, notification preferences

**Key Components**:
- `SessionCard` - Summary of each research session
- `KnowledgeGraphViz` - D3.js visualization of concept connections
- `NotificationPanel` - Real-time updates
- `VetoButton` - One-click veto with reason input

## 🔐 Security & Privacy

**Principles**:
1. **No external services** - All data stays in MongoDB (Carles' control)
2. **Encrypted storage** - Sensitive findings encrypted at rest
3. **Audit trail** - Every action logged
4. **Veto enforcement** - Technical enforcement, not just trust

**Implementation**:
- MongoDB TLS encryption
- Session tokens for dashboard access
- Rate limiting on autonomous research (max 10 sessions/day initial)
- Blacklist enforcement at multiple levels

## 📈 Performance Considerations

**Bottlenecks**:
1. Web search latency (1-3s per query)
2. PDF downloading/parsing (2-10s per paper)
3. NLP analysis (1-5s per document)

**Optimizations**:
- Parallel searches (Promise.all)
- Caching of analyzed papers
- Incremental synthesis (don't wait for all papers)
- Background processing for low-priority research

**Metrics to Track**:
- Average session duration
- Papers analyzed per session
- Insights extracted per paper
- Consolidation rate (what % goes to CMS)

---

**Next**: See ROADMAP.md for implementation phases.
