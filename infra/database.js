import { Pool } from "pg";

async function query(queryObject) {
  const client = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max: 500,
    connectionTimeoutMillis: 25000,
    idleTimeoutMillis: 2000,
    allowExitOnIdle: true,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);

    return result;
  } finally {
    //await client.end();
  }
}

export default {
  query: query,
};
