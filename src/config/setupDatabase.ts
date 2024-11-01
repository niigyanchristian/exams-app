import pool from './db';
import fs from 'fs';
import path from 'path';

const runSQLFile = async (filePath: string) => {
    const sql = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
    try {
        await pool.query(sql);
        console.log(`Executed ${filePath}`);
    } catch (error) {
        console.error(`Error executing ${filePath}:`, error);
    }
};

const setupDatabase = async () => {
    try {
        console.log('Setting up database...');

        await runSQLFile('migrations/create_tables.sql');
        await runSQLFile('migrations/seed_data.sql');

        console.log('Database setup complete.');
    } catch (error) {
        console.error('Error setting up the database:', error);
    } finally {
        await pool.end();
    }
};

setupDatabase();
