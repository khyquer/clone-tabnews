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

test("GET to /api/v1/status should return property application", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("application");
  expect(typeof responseBody.application).toBe("object");
});

test("GET to /api/v1/status should return property application.name", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { application } = await response.json();

  expect(application).toHaveProperty("name");
  expect(typeof application.name).toBe("string");
});

test("GET to /api/v1/status should return property application.version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { application } = await response.json();

  expect(application).toHaveProperty("version");
  expect(typeof application.version).toBe("string");
});

test("GET to /api/v1/status should return property application.uptime_seconds", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { application } = await response.json();

  expect(application).toHaveProperty("uptime_seconds");
  expect(typeof application.uptime_seconds).toBe("number");
  expect(application.uptime_seconds).toBeGreaterThanOrEqual(0);
});

test("GET to /api/v1/status should return property application.environment", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { application } = await response.json();

  expect(application).toHaveProperty("environment");
  expect(typeof application.environment).toBe("string");
  // Deve corresponder ao NODE_ENV ou ser 'development' como padrão
  expect(["development", "production", "test"]).toContain(
    application.environment,
  );
});