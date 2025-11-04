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
  expect(responseBody).toHaveProperty("dependencies");
  expect(responseBody.dependencies).toHaveProperty("database");
});

test("GET to /api/v1/status should return property database.version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { dependencies } = await response.json();

  expect(dependencies.database).toHaveProperty("version");
  expect(typeof dependencies.database.version).toBe("number");
});

test("GET to /api/v1/status should return property database.max_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { dependencies } = await response.json();

  expect(dependencies.database).toHaveProperty("max_connections");
  expect(typeof dependencies.database.max_connections).toBe("number");
});

test("GET to /api/v1/status should return property database.count_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { dependencies } = await response.json();

  expect(dependencies.database).toHaveProperty("count_connections");
  expect(typeof dependencies.database.count_connections).toBe("number");
  expect(dependencies.database.count_connections).toBe(1);
  expect(dependencies.database.count_connections).toBeLessThanOrEqual(
    dependencies.database.max_connections,
  );
});

test("GET /api/v1/status should return property application with correct structure", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("application");
  expect(typeof responseBody.application).toBe("object");

  const app = responseBody.application;

  expect(app).toHaveProperty("name");
  expect(app).toHaveProperty("version");
  expect(app).toHaveProperty("uptime_seconds");
  expect(app).toHaveProperty("environment");

  expect(typeof app.name).toBe("string");
  expect(typeof app.version).toBe("string");
  expect(typeof app.uptime_seconds).toBe("number");
  expect(typeof app.environment).toBe("string");

  const expectedEnv = process.env.NODE_ENV || "development";
  const possibleEnvs = ["development", process.env.NODE_ENV];
expect(possibleEnvs).toContain(app.environment);
});