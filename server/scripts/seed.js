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

async function runSeeds() {
  try {
    console.log('Running seeds...');
    
    // Get all seed files from the seeds directory
    const seedsDir = path.join(__dirname, '../database/seeds');
    const seedFiles = fs.readdirSync(seedsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure correct order
    
    // Create seeds table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS seeds (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    // Get list of already applied seeds
    const appliedSeeds = await pool.query('SELECT name FROM seeds');
    const appliedSeedNames = appliedSeeds.rows.map(row => row.name);
    
    // Apply each seed that hasn't been applied yet
    for (const file of seedFiles) {
      if (!appliedSeedNames.includes(file)) {
        console.log(`Applying seed: ${file}`);
        
        // Read and execute the seed file
        const seedContent = fs.readFileSync(path.join(seedsDir, file), 'utf8');
        await pool.query(seedContent);
        
        // Record that the seed was applied
        await pool.query('INSERT INTO seeds (name) VALUES ($1)', [file]);
        
        console.log(`Seed applied: ${file}`);
      } else {
        console.log(`Seed already applied: ${file}`);
      }
    }
    
    console.log('Seeds completed successfully!');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeeds();