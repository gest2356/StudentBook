import mysql from 'mysql2/promise'
import dotenv from 'dotenv/config'

let pool;

export async function connectToMySQL() {
    if (!pool) {
        pool = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        })

        await pool.query('SELECT 1')
        return pool
    }
}

export async function queryMySQL(pool, query, params) {
    const [rows] = await pool.query(query, params);
    return rows;
}