import { Client } from 'pg'; // Importando o módulo 'pg'

// Constrói a URL de conexão do banco de dados a partir das variáveis de ambiente.
const databaseUrl = process.env.DATABASE_URL;

async function query(queryObject) {
  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error;
  } finally {
    // Garante que o cliente é fechado, mesmo que ocorra um erro.
    await client.end();
  }
}

export default {
  query,
};