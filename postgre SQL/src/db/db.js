require("dotenv").config();

const { Pool } = require("pg");

//create a new pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function query(text, params) {
    const start = Date.now();

    try {
        const result = await pool.query(text, params);

        //execution time
        const duration = Date.now() - start;

        console.log(`Executed Query: ${JSON.stringify({ text, duration, rows: result.rowCount })}`);
        return result;
    }
    catch (e) {
        console.error(e);
    }
}

module.exports = { query };