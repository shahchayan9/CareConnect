require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
});

async function runMigrations() {
  try {
    console.log('Running migrations...');
    
    // Get all migration files from the migrations directory
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure correct order
    
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    // Get list of already applied migrations
    const appliedMigrations = await pool.query('SELECT name FROM migrations');
    const appliedMigrationNames = appliedMigrations.rows.map(row => row.name);
    
    // Apply each migration that hasn't been applied yet
    for (const file of migrationFiles) {
      if (!appliedMigrationNames.includes(file)) {
        console.log(`Applying migration: ${file}`);
        
        // Read and execute the migration file
        const migrationContent = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await pool.query(migrationContent);
        
        // Record that the migration was applied
        await pool.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
        
        console.log(`Migration applied: ${file}`);
      } else {
        console.log(`Migration already applied: ${file}`);
      }
    }
    
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();