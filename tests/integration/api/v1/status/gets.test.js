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

  expect(responseBody.database).toBeDefined();
});

test("GET to /api/v1/status should return property database e version, max_connections and connectionsUseds ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();

  expect(responseBody.database.version).toBeDefined();
  expect(responseBody.database.max_connections).toBeDefined();
  expect(responseBody.database.count_connections).toBeDefined();
});
