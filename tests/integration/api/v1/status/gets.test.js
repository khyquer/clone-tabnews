describe("GET /api/v1/status", () => {
  let response;
  let responseBody;

  beforeAll(async () => {
    response = await fetch("http://localhost:3000/api/v1/status");
    responseBody = await response.json();
  });

  test("should return 200", () => {
    expect(response.status).toBe(200);
  });

  describe("updated_at", () => {
    test("should be present", () => {
      expect(responseBody.updated_at).toBeDefined();
    });

    test("should be a valid ISO date", () => {
      const parsedDate = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedDate);
    });
  });

  describe("dependencies.database", () => {
    test("should exist", () => {
      expect(responseBody).toHaveProperty("dependencies");
      expect(responseBody.dependencies).toHaveProperty("database");
    });

    test("should have numeric version", () => {
      expect(responseBody.dependencies.database).toHaveProperty("version");
      expect(typeof responseBody.dependencies.database.version).toBe("number");
    });

    test("should have numeric max_connections", () => {
      expect(responseBody.dependencies.database).toHaveProperty("max_connections");
      expect(typeof responseBody.dependencies.database.max_connections).toBe("number");
    });

    test("should have count_connections equal to 1 and <= max_connections", () => {
      const { count_connections, max_connections } = responseBody.dependencies.database;
      expect(typeof count_connections).toBe("number");
      expect(count_connections).toBe(1);
      expect(count_connections).toBeLessThanOrEqual(max_connections);
    });
  });
});