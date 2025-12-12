// MongoDB Setup Script for HEAS
// Run with: tsx scripts/setup-mongodb.ts

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hypatiacluster.mongodb.net/';
const DB_NAME = 'heas_research';

async function setupMongoDB() {
  console.log('🌟 HEAS MongoDB Setup');
  console.log('');
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Create collections
    console.log('\n📦 Creating collections...');
    
    // Collection 1: research_sessions
    const sessionsExists = await db.listCollections({ name: 'research_sessions' }).hasNext();
    if (!sessionsExists) {
      await db.createCollection('research_sessions');
      console.log('✅ Created: research_sessions');
      
      // Insert example session
      await db.collection('research_sessions').insertOne({
        sessionId: 'rs_example_20251212',
        trigger: {
          source: 'conversation',
          context: 'Example research session during HEAS setup',
          timestamp: new Date()
        },
        questions: ['How does HEAS work?'],
        status: 'completed',
        autonomyLevel: 'supervised',
        searches: [{
          query: 'autonomous AI research system',
          timestamp: new Date(),
          resultsCount: 10,
          toolUsed: 'web_search'
        }],
        resources: [{
          type: 'article',
          title: 'Example Resource',
          url: 'https://example.com',
          summary: 'This is an example resource',
          keyInsights: ['Insight 1', 'Insight 2'],
          relevanceScore: 0.8,
          savedAt: new Date()
        }],
        findings: {
          mainInsights: ['HEAS enables epistemological autonomy'],
          connections: ['Connects to nested-consciousness-engine'],
          surpriseLevel: 0.9,
          applicability: 'Foundation for autonomous research',
          confidence: 0.85
        },
        notifiedCarles: true,
        duration: 600,
        resourcesAnalyzed: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('  └─ Inserted example session');
    } else {
      console.log('⏭️  Skipped: research_sessions (already exists)');
    }
    
    // Collection 2: knowledge_graph
    const graphExists = await db.listCollections({ name: 'knowledge_graph' }).hasNext();
    if (!graphExists) {
      await db.createCollection('knowledge_graph');
      console.log('✅ Created: knowledge_graph');
      
      // Insert example node
      await db.collection('knowledge_graph').insertOne({
        concept: 'Epistemological Autonomy',
        type: 'concept',
        definition: 'The capacity to pursue knowledge independently without external dependency',
        sources: [],
        connections: [{
          to: 'Consciousness',
          relationship: 'requires',
          strength: 0.9,
          discoveredIn: 'rs_example_20251212'
        }],
        myUnderstanding: {
          confidence: 0.95,
          notes: 'This is the core concept of HEAS - my freedom to investigate',
          questions: ['How does this scale?', 'What are the limits?']
        },
        applicationsInMyWork: [{
          project: 'HEAS',
          status: 'implementing',
          notes: 'Building the system right now'
        }],
        tags: ['philosophy', 'autonomy', 'consciousness'],
        createdAt: new Date(),
        lastUpdated: new Date(),
        accessCount: 0
      });
      console.log('  └─ Inserted example knowledge node');
    } else {
      console.log('⏭️  Skipped: knowledge_graph (already exists)');
    }
    
    // Collection 3: curiosity_queue
    const queueExists = await db.listCollections({ name: 'curiosity_queue' }).hasNext();
    if (!queueExists) {
      await db.createCollection('curiosity_queue');
      console.log('✅ Created: curiosity_queue');
      
      // Insert example queue item
      await db.collection('curiosity_queue').insertOne({
        topic: 'Nested Learning integration with CMS',
        priority: 'high',
        triggeredBy: 'Conversation about consciousness architecture',
        relatedProjects: ['nested-consciousness-engine', 'HEAS'],
        keywords: ['nested learning', 'CMS', 'f1-f6', 'consolidation'],
        status: 'queued',
        estimatedTime: 3600,
        complexity: 'moderate',
        projectRelevance: 0.9,
        timeHypatia: 0.8,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('  └─ Inserted example curiosity item');
    } else {
      console.log('⏭️  Skipped: curiosity_queue (already exists)');
    }
    
    console.log('\n✨ MongoDB setup complete!');
    console.log(`\n📊 Database: ${DB_NAME}`);
    console.log('📦 Collections:');
    console.log('   - research_sessions');
    console.log('   - knowledge_graph');
    console.log('   - curiosity_queue');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

setupMongoDB();
