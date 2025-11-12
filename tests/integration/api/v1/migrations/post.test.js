import database from "infra/database.js";

beforeAll(cleanDatabase)

async function cleanDatabase(){
  await database.query("DROP schema public cascade; CREATE schema public")
}

test("POST to /api/v1/migrations should return 200 and save rowns in database", async () => {
  const response1 = await fetch("http://localhost:3001/api/v1/migrations", {
    method: 'POST'
  });
  expect(response1.status).toBe(201);
  const responseBody1 = await response1.json();

  const isResponseBodyArray1 = Array.isArray(responseBody1);
  expect(isResponseBodyArray1).toBe(true);

  expect(responseBody1.length).toBeGreaterThan(0);
  
  const response2 = await fetch("http://localhost:3001/api/v1/migrations", {
    method: 'POST'
  });
  expect(response2.status).toBe(200);
  const responseBody2 = await response2.json();

  const isResponseBodyArray2 = Array.isArray(responseBody2);
  expect(isResponseBodyArray2).toBe(true);

  expect(responseBody2.length).toBe(0);
});
