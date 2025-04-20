require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');
const config = require('../config');
const db = require('../db');

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
});

async function runMigrations() {
  try {
    // Drop all existing tables
    console.log('Dropping existing tables...');
    await db.query(`
      DROP TABLE IF EXISTS 
        volunteer_trainings,
        event_volunteers,
        participant_events,
        feedback,
        volunteer_availability,
        resources,
        events,
        trainings,
        volunteers,
        participants,
        users
      CASCADE;
    `);
    console.log('Existing tables dropped.');

    // Read all migration files
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const files = await fs.readdir(migrationsDir);
    
    // Sort files to ensure they run in order
    const migrationFiles = files
      .filter(f => f.endsWith('.sql'))
      .sort();
    
    console.log('Running migrations...');
    
    // Run each migration
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const sql = await fs.readFile(path.join(migrationsDir, file), 'utf-8');
      await db.query(sql);
      console.log(`Completed migration: ${file}`);
    }
    
    console.log('All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();