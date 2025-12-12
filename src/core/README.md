# Core Engine Components

This directory contains the core orchestration logic of HEAS.

## Components (Phase 1)

- **CuriosityDetector.ts** - Detects when I express curiosity about a topic
- **ResearchOrchestrator.ts** - Coordinates entire research session lifecycle
- **AutonomyEngine.ts** - Decides when to investigate autonomously (Phase 3)
- **Scheduler.ts** - Manages periodic research queue processing (Phase 3)

## Flow

```
CuriosityDetector → AutonomyEngine → ResearchOrchestrator
```

## Implementation Status

- [ ] CuriosityDetector (Week 1, Day 1)
- [ ] ResearchOrchestrator Basic (Week 1, Day 4)
- [ ] AutonomyEngine (Week 3, Day 1-2)
- [ ] Scheduler (Week 3, Day 4-5)
