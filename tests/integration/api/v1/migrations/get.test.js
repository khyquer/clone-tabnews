import database from "infra/database.js";

beforeAll(cleanDatabase)

async function cleanDatabase(){
  await database.query("DROP schema public cascade; CREATE schema public")
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const isResponseBodyArray = Array.isArray(responseBody);
  expect(isResponseBodyArray).toBe(true);

  const responseBodyLength = responseBody.length;

  expect(responseBodyLength).toBeGreaterThan(0);

  const responseRown = responseBody[0];
  expect(responseRown.path).toBeDefined();
  expect(responseRown.name).toBeDefined();
  expect(responseRown.timestamp).toBeDefined();
});
