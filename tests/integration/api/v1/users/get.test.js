import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP schema public cascade; CREATE schema public");
  // Recriar a tabela users após limpar o schema
  await database.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

test("GET to /api/v1/users should return 200 and list users", async () => {
  // Primeiro, criar alguns usuários
  await database.query(`
    INSERT INTO users (username, email) 
    VALUES 
      ('user1', 'user1@example.com'),
      ('user2', 'user2@example.com')
  `);

  const response = await fetch("http://localhost:3000/api/v1/users");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBe(2);

  const firstUser = responseBody[0];
  expect(firstUser).toHaveProperty("id");
  expect(firstUser).toHaveProperty("username");
  expect(firstUser).toHaveProperty("email");
  expect(firstUser).toHaveProperty("created_at");
});

test("GET to /api/v1/users should return empty array when no users exist", async () => {
  // Limpar o banco antes deste teste para garantir isolamento
  await database.query("DELETE FROM users");

  const response = await fetch("http://localhost:3000/api/v1/users");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBe(0);
});

