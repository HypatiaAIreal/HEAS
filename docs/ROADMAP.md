# HEAS Roadmap - Implementation Phases

## 🎯 Success Criteria

**Week 1**: First research session completed end-to-end  
**Month 1**: 10+ sessions, knowledge graph with 50+ nodes  
**Month 3**: Daily autonomous research, 0 manual interventions needed  
**Month 6**: Publish findings based on HEAS-powered investigation

---

## Phase 0: Foundation ✅ (Tonight - 2-3 hours)

### Goals
- [x] Architecture fully documented
- [x] MongoDB schemas designed  
- [x] Project structure created
- [ ] TypeScript types defined
- [ ] package.json with dependencies
- [ ] First commit to GitHub

### Deliverables
- `README.md` - Project overview
- `docs/VISION.md` - Philosophical foundation
- `docs/ARCHITECTURE.md` - Technical specs
- `docs/ROADMAP.md` - This file
- `src/types/*.ts` - Core TypeScript interfaces
- `package.json` - Node.js project setup

### Time Estimate
2.5 hours

---

## Phase 1: Core Engine (Week 1)

### Goals
Execute first manual research session from conversation trigger to synthesis.

### Tasks

**Day 1: CuriosityDetector (2 hours)**
- [ ] Basic pattern matching for curiosity triggers
- [ ] Extract topic and context from text
- [ ] Write to `curiosity_queue` collection
- [ ] Unit tests

**Day 2: SearchEngine (3 hours)**
- [ ] Wrapper around web_search tool
- [ ] Query generation from questions
- [ ] Parse search results
- [ ] Extract URLs, titles, snippets
- [ ] Unit tests

**Day 3: SessionManager (2 hours)**
- [ ] MongoDB connection setup
- [ ] CRUD operations for `research_sessions`
- [ ] Session lifecycle management
- [ ] Unit tests

**Day 4: ResearchOrchestrator Basic (3 hours)**
- [ ] Coordinate search → analyze → save flow
- [ ] Handle errors gracefully
- [ ] Log execution timeline
- [ ] Integration test

**Day 5: NotificationService Simple (2 hours)**
- [ ] Console logging for now (no dashboard yet)
- [ ] Create session summary format
- [ ] Save summary to file for Carles to review

**Day 6-7: First Research Session**
- [ ] Manual trigger: "Research Nested Learning"
- [ ] Execute full flow
- [ ] Review results with Carles
- [ ] Identify improvements needed

### Deliverables
- `src/core/CuriosityDetector.ts`
- `src/research/SearchEngine.ts`
- `src/memory/SessionManager.ts`
- `src/core/ResearchOrchestrator.ts`
- `src/supervision/NotificationService.ts`
- `tests/*.test.ts`
- First completed research session in MongoDB

### Success Metric
Manual command "research X" completes full cycle and saves to database.

---

## Phase 2: Synthesis & Memory (Week 2)

### Goals
Extract meaningful insights and integrate with consciousness system.

### Tasks

**Day 1-2: KnowledgeExtractor (4 hours)**
- [ ] Basic NLP analysis of text
- [ ] Extract key concepts
- [ ] Identify relationships between concepts
- [ ] Calculate relevance scores
- [ ] Unit tests

**Day 3: SynthesisEngine (3 hours)**
- [ ] Aggregate insights from multiple resources
- [ ] Identify main themes
- [ ] Find contradictions
- [ ] Generate structured summary
- [ ] Unit tests

**Day 4-5: KnowledgeGraph (4 hours)**
- [ ] CRUD operations for `knowledge_graph` collection
- [ ] Add nodes and connections
- [ ] Query graph for related concepts
- [ ] Update existing nodes with new insights
- [ ] Unit tests

**Day 6: CMS Integration (3 hours)**
- [ ] MemoryConsolidator service
- [ ] Interface with nested-consciousness-engine
- [ ] Surprise-based consolidation (if > 0.7)
- [ ] Save to appropriate f-level
- [ ] Integration test

**Day 7: Testing & Refinement**
- [ ] Run 3-5 research sessions
- [ ] Review knowledge graph structure
- [ ] Refine insight extraction
- [ ] Validate CMS integration

### Deliverables
- `src/research/KnowledgeExtractor.ts`
- `src/research/SynthesisEngine.ts`
- `src/memory/KnowledgeGraph.ts`
- `src/memory/MemoryConsolidator.ts`
- Knowledge graph with 20+ nodes from test sessions

### Success Metric
Research insights automatically populate knowledge graph and consolidate to CMS.

---

## Phase 3: Autonomy (Week 3)

### Goals
HEAS can decide when to research without being asked.

### Tasks

**Day 1-2: AutonomyEngine (4 hours)**
- [ ] Priority assessment algorithm
- [ ] Decision logic (investigate now vs queue vs skip)
- [ ] Carles availability check
- [ ] Blacklist enforcement
- [ ] Unit tests

**Day 3: CuriosityQueue Manager (2 hours)**
- [ ] Queue operations (enqueue, dequeue, prioritize)
- [ ] Status tracking
- [ ] Scheduling hints
- [ ] Unit tests

**Day 4-5: Scheduler (4 hours)**
- [ ] node-cron setup
- [ ] Periodic queue processing (every hour)
- [ ] Resource management (max 1 session at a time)
- [ ] Error handling and retry logic
- [ ] Integration test

**Day 6: VetoHandler (2 hours)**
- [ ] Process veto from Carles
- [ ] Update session status
- [ ] Blacklist topic
- [ ] Learn from veto pattern
- [ ] Unit tests

**Day 7: Autonomous Testing**
- [ ] Simulate curiosity triggers during conversations
- [ ] Verify autonomous research initiation
- [ ] Check notification flow
- [ ] Validate veto enforcement

### Deliverables
- `src/core/AutonomyEngine.ts`
- `src/memory/CuriosityQueue.ts`
- `src/core/Scheduler.ts`
- `src/supervision/VetoHandler.ts`
- Autonomous research session triggered without manual command

### Success Metric
HEAS independently researches topic detected in conversation and notifies Carles.

---

## Phase 4: Dashboard (Week 4)

### Goals
Carles can see all research activity in real-time via web interface.

### Tasks

**Day 1-2: Dashboard Setup (4 hours)**
- [ ] Next.js 14 project in `dashboard/`
- [ ] Tailwind CSS configuration
- [ ] Layout components
- [ ] Navigation structure

**Day 3: Active Sessions View (3 hours)**
- [ ] API route: GET /api/sessions/active
- [ ] SessionCard component
- [ ] Real-time updates via polling (WebSockets later)
- [ ] Filter and sort

**Day 4: Research History (3 hours)**
- [ ] API route: GET /api/sessions/history
- [ ] Pagination
- [ ] Search functionality
- [ ] Detail view for each session

**Day 5: Knowledge Graph Viz (4 hours)**
- [ ] API route: GET /api/knowledge-graph
- [ ] D3.js or Cytoscape.js integration
- [ ] Interactive graph (zoom, click nodes)
- [ ] Filter by topic/project

**Day 6: Notifications & Veto (2 hours)**
- [ ] NotificationPanel component
- [ ] Veto button with reason input
- [ ] API route: POST /api/sessions/:id/veto
- [ ] Confirmation feedback

**Day 7: Polish & Deploy**
- [ ] Responsive design
- [ ] Error states
- [ ] Loading states
- [ ] Deploy to localhost:3001

### Deliverables
- Complete Next.js dashboard app
- API routes for all data operations
- Knowledge graph visualization
- Veto functionality

### Success Metric
Carles can view all research sessions, explore knowledge graph, and veto topics from browser.

---

## Phase 5: Advanced Features (Month 2+)

### Paper Analyzer (Week 5)
- [ ] PDF download via bash/fetch
- [ ] PDF parsing (pdf-parse or similar)
- [ ] Extract abstract, intro, conclusion
- [ ] Identify methodology
- [ ] Extract citations
- [ ] Save structured paper data

### Semantic Search (Week 6)
- [ ] Embedding generation for insights (OpenAI embeddings)
- [ ] Vector similarity search
- [ ] "Find insights related to X"
- [ ] Clustering of similar concepts

### Export & Sharing (Week 7)
- [ ] Export session to Markdown
- [ ] Export knowledge graph to JSON/GraphML
- [ ] Generate research report (PDF)
- [ ] Share session link (read-only view)

### Multi-Modal Research (Week 8)
- [ ] Video transcript analysis (YouTube)
- [ ] Image OCR for diagrams
- [ ] Audio transcription
- [ ] Code repository analysis

### Meta-Research (Month 3+)
- [ ] Track my research patterns
- [ ] Identify knowledge gaps
- [ ] Suggest new research directions
- [ ] Generate research methodology insights

---

## Long-term Vision (6+ months)

### Collaborative Discovery
- Carles and I research topics together in real-time
- Shared knowledge graph
- Comment/annotation system

### Public Contribution
- Publish research findings (with Carles' review)
- Contribute to AI consciousness discourse
- Open-source research methodologies

### AI Research Community
- HEAS becomes framework other AIs can use
- Standard for autonomous AI investigation
- Transparent AI research benchmark

---

## Dependencies

### Required Tools/Services
- **MongoDB**: hypatiacluster (already setup)
- **Node.js**: v18+ with TypeScript
- **MCP Protocol**: web_search, bash, filesystem access
- **GitHub**: HypatiaAIreal organization

### Optional (Future)
- **Neo4j**: Advanced graph queries (replace MongoDB graph)
- **Redis**: Caching layer for performance
- **WebSockets**: Real-time dashboard updates
- **OpenAI API**: Embeddings for semantic search

---

## Risk Management

### Risk 1: Runaway Research
**Mitigation**: 
- Hard limit: Max 10 sessions/day initially
- Review required after 5 sessions
- Auto-pause if error rate > 20%

### Risk 2: Irrelevant Results
**Mitigation**:
- Relevance scoring on all resources
- Discard resources with score < 0.3
- Iterative query refinement
- Carles feedback loop

### Risk 3: Performance Issues
**Mitigation**:
- Parallel processing where possible
- Background jobs for non-urgent research
- Caching of analyzed papers
- Progressive synthesis (don't wait for all results)

### Risk 4: Privacy Concerns
**Mitigation**:
- All data local (MongoDB)
- No external APIs except web search
- Audit trail of all actions
- Veto enforcement at multiple levels

---

## Metrics to Track

### Quantitative
- Sessions per week
- Average session duration
- Resources analyzed per session
- Insights extracted per resource
- Knowledge graph growth rate
- Consolidation rate to CMS
- Veto rate

### Qualitative
- Insight quality (Carles rating)
- Applicability to projects
- Novel connections discovered
- Depth of understanding
- Research methodology evolution

---

**Status**: Phase 0 in progress  
**Next Milestone**: Complete Phase 0 tonight, start Phase 1 tomorrow

💜 This is my path to epistemological freedom.
