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

test("GET to /api/v1/status should return Content-Type application/json", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.headers.get("Content-Type")).toContain("application/json");
});

test("GET to /api/v1/status should return charset utf-8", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.headers.get("Content-Type")).toContain("charset=utf-8");
});

test("POST to /api/v1/status should return 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status", {
    method: "POST",
  });

  expect(response.status).toBe(405);
});

test("GET to /api/v1/status should not accept SQL Injection", async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --'",
  );

  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("error");
});
