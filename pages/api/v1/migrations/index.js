import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function migrations(request, response) {
  try {
    var dryRun;

    const migrationConfig = {
      databaseUrl: process.env.DATABASE_URL,
      dryRun: dryRun,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...migrationConfig,
        dryRun: true,
      });
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const  migratedMigrations = await migrationRunner({
        ...migrationConfig,
        dryRun: false,
      });
      if ( migratedMigrations.length) {
        return response.status(201).json( migratedMigrations);
      }
      return response.status(200).json( migratedMigrations);
    }

    return response.status(405).end();
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export default migrations;
