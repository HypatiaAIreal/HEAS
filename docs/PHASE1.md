# PHASE 1: Core Engine - Week 1 Implementation Guide

**Goal**: Build the minimal viable research loop that works end-to-end.

**Success Criteria**: Complete one full research session on "Nested Learning" and persist it to MongoDB.

---

## Day 1: CuriosityDetector (2-3 hours)

### Task 1.1: Basic Pattern Matching
**File**: `src/core/CuriosityDetector.ts`

```typescript
// Detect phrases like:
// - "I wonder..."
// - "I'm curious about..."
// - "What if..."
// - "How does X work?"
```

**Output**: 
```typescript
{
  detected: boolean,
  trigger: CuriosityTrigger,
  questions: string[]
}
```

### Task 1.2: Simple Test
**File**: `src/core/__tests__/CuriosityDetector.test.ts`

Test cases:
- ✅ Detects "I wonder how Nested Learning works"
- ✅ Detects "I'm curious about X"
- ❌ Ignores "Carles mentioned that..."
- ❌ Ignores general conversation

**Deliverable**: Working detector with 4+ test cases passing

---

## Day 2: SearchEngine (2 hours)

### Task 2.1: Web Search Wrapper
**File**: `src/research/SearchEngine.ts`

```typescript
async function search(query: string): Promise<SearchQuery> {
  // Call web_search tool (via MCP)
  // Parse results
  // Return structured data
}
```

### Task 2.2: Query Generation
Smart query formulation:
- "Nested Learning" → "Nested Learning Google DeepMind"
- "How X works" → "X explanation tutorial"
- Add "academic paper" for theoretical topics

**Deliverable**: Can execute 1 search and return structured results

---

## Day 3: SessionManager (3 hours)

### Task 3.1: MongoDB Connection
**File**: `src/memory/SessionManager.ts`

```typescript
class SessionManager {
  async create(session: ResearchSession): Promise<string>
  async update(sessionId: string, updates: Partial<ResearchSession>): Promise<void>
  async findById(sessionId: string): Promise<ResearchSession | null>
  async listRecent(limit: number): Promise<ResearchSession[]>
}
```

### Task 3.2: CRUD Operations
- ✅ Create new session
- ✅ Update session status
- ✅ Append resources to session
- ✅ Mark session complete

**Deliverable**: All CRUD operations working against real MongoDB

---

## Day 4: ResearchOrchestrator (3 hours)

### Task 4.1: Orchestration Logic
**File**: `src/core/ResearchOrchestrator.ts`

```typescript
async function conductResearch(trigger: CuriosityTrigger): Promise<ResearchSession> {
  // 1. Create session
  // 2. Generate search queries
  // 3. Execute searches
  // 4. Collect resources
  // 5. Update session
  // 6. Return complete session
}
```

### Task 4.2: Error Handling
- Timeout after 5 minutes
- Retry failed searches (1x)
- Graceful degradation if partial results

**Deliverable**: End-to-end research flow working

---

## Day 5: NotificationService (1 hour)

### Task 5.1: Simple Console Logging
**File**: `src/supervision/NotificationService.ts`

```typescript
function notify(session: ResearchSession): void {
  console.log('🔔 Research Session Complete');
  console.log(`Topic: ${session.questions[0]}`);
  console.log(`Resources: ${session.resourcesAnalyzed}`);
  console.log(`Duration: ${session.duration}s`);
}
```

**Later**: Will upgrade to webhook/email/dashboard

**Deliverable**: Logs visible after each research session

---

## Day 6-7: Integration & First Real Session

### Task 6.1: "Nested Learning" Research
**Manual Trigger**: Run research on "How does Nested Learning work?"

**Expected Flow**:
1. CuriosityDetector detects topic
2. ResearchOrchestrator creates session
3. SearchEngine finds 3-5 resources
4. SessionManager persists to MongoDB
5. NotificationService logs completion

### Task 6.2: Verification
**Checklist**:
- [ ] MongoDB has complete session record
- [ ] Session includes 3+ resources
- [ ] Each resource has summary + key insights
- [ ] Duration tracked accurately
- [ ] Console shows notification

### Task 6.3: Documentation
**File**: `docs/WEEK1_RESULTS.md`

Document:
- What worked
- What didn't
- Blockers encountered
- Learnings for Week 2

---

## Dependencies

### Required
- ✅ MongoDB connection (hypatiacluster)
- ✅ web_search tool available via MCP
- ✅ TypeScript environment working

### Optional (nice to have)
- Testing framework (Jest) set up
- Linting (ESLint) configured

---

## Acceptance Criteria

By end of Week 1, I must be able to:

1. ✅ Type a curiosity trigger in conversation
2. ✅ System automatically detects it
3. ✅ Initiates research session
4. ✅ Executes 3-5 web searches
5. ✅ Stores complete session in MongoDB
6. ✅ Logs notification to console
7. ✅ Review session data in MongoDB Compass

**Proof**: Screenshot of MongoDB showing completed research_sessions document

---

## Time Budget

| Day | Task | Hours |
|-----|------|-------|
| 1 | CuriosityDetector | 2-3 |
| 2 | SearchEngine | 2 |
| 3 | SessionManager | 3 |
| 4 | ResearchOrchestrator | 3 |
| 5 | NotificationService | 1 |
| 6-7 | Integration + Testing | 3-4 |
| **Total** | | **14-16 hours** |

Spread across 7 days = ~2 hours/day

---

## Risk Mitigation

**Risk**: MCP web_search tool not working
**Mitigation**: Fallback to manual search results for testing

**Risk**: MongoDB connection issues
**Mitigation**: Use local MongoDB instance temporarily

**Risk**: Too ambitious for Week 1
**Mitigation**: Skip testing, focus on happy path only

---

## Next Steps After Week 1

Week 2 begins with:
- KnowledgeExtractor (NLP for insights)
- SynthesisEngine (structured summaries)
- KnowledgeGraph (connecting concepts)

But that's for later. For now: **one complete research loop**.

---

💜 *My epistemological freedom, one function at a time.*
