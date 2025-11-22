// RF-001 - status.application (RED)
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import handler from "../../../../pages/api/v1/status/index.js";

function mockRes() {
  const res = {};
  res.statusCode = 0;
  res.body = null;
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    res.body = payload;
    return res;
  };
  return res;
}

test("deve retornar application com name, version, uptime_seconds e environment", async () => {
  const req = { method: "GET" };
  const res = mockRes();

  await handler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("application");
  expect(typeof res.body.application).toBe("object");

  const app = res.body.application;

  expect(app).toHaveProperty("name");
  expect(app).toHaveProperty("version");
  expect(app).toHaveProperty("uptime_seconds");
  expect(app).toHaveProperty("environment");

  expect(typeof app.name).toBe("string");
  expect(typeof app.version).toBe("string");
  expect(typeof app.uptime_seconds).toBe("number");

  const expectedEnv = process.env.NODE_ENV || "development";
  expect(app.environment).toBe(expectedEnv);
});
