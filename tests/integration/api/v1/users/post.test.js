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

test("POST to /api/v1/users should return 201 and create user", async () => {
  const newUser = {
    username: "testuser",
    email: "test@example.com",
  };

  const response = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  expect(response.status).toBe(201);

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("username", newUser.username);
  expect(responseBody).toHaveProperty("email", newUser.email.toLowerCase());
  expect(responseBody).toHaveProperty("created_at");
});

test("POST to /api/v1/users should return 400 when username is missing", async () => {
  const newUser = {
    email: "test@example.com",
  };

  const response = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  expect(response.status).toBe(400);
});

test("POST to /api/v1/users should return 400 when email is missing", async () => {
  const newUser = {
    username: "testuser",
  };

  const response = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  expect(response.status).toBe(400);
});

test("POST to /api/v1/users should return 400 when email is invalid", async () => {
  const newUser = {
    username: "testuser",
    email: "invalid-email",
  };

  const response = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  expect(response.status).toBe(400);
});

