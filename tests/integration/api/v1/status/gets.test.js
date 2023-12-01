test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);
});

test("GET to /api/v1/status should return property update_at", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
});

test("GET to /api/v1/status should return property update_at is a date", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("GET to /api/v1/status should return property database", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("database");
});

test("GET to /api/v1/status should return property database.version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { database } = await response.json();

  expect(database).toHaveProperty("version");
  expect(typeof database.version).toBe("number");
});

test("GET to /api/v1/status should return property database.max_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { database } = await response.json();

  expect(database).toHaveProperty("max_connections");
  expect(typeof database.max_connections).toBe("number");
});

test("GET to /api/v1/status should return property database.count_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { database } = await response.json();

  expect(database).toHaveProperty("count_connections");
  expect(typeof database.count_connections).toBe("number");
  expect(database.count_connections).toBeLessThanOrEqual(
    database.max_connections,
  );
});
