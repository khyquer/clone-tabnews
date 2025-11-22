import fs from "fs";
import path from "path";

const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8"),
);

export function buildStatus(base = {}) {
  return {
    ...base,
    application: {
      name: pkg.name,
      version: pkg.version,
      uptime_seconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || "development",
    },
  };
}
