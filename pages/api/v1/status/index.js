import database from "infra/database.js";

const serverStartTime = Date.now();

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    // ===== Consultas ao banco =====
    const queryVersionDataBaseResult = await database.query("SHOW server_version;");
    const queryVersionDataBaseValue = parseInt(queryVersionDataBaseResult.rows[0].server_version);

    const maxConnectionsDataBaseResult = await database.query("SHOW max_connections;");
    const maxConnectionsDataBaseValue = parseInt(maxConnectionsDataBaseResult.rows[0].max_connections);

    const databaseName = process.env.POSTGRES_DB;

    const rountConnectionsDataBaseResult = await database.query({
      text: "SELECT count(*)::int as count_connections FROM pg_stat_activity WHERE datname = $1",
      values: [databaseName],
    });
    const rountConnectionsDataBaseValue = rountConnectionsDataBaseResult.rows[0].count_connections;

    // ===== Informações da aplicação (RF-001) =====
    const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
    const applicationInfo = {
      name: process.env.npm_package_name || "clone-tabnews",
      version: process.env.npm_package_version || "1.0.0",
      uptime_seconds: uptimeSeconds,
      environment: process.env.NODE_ENV || "development",
    };

    // ===== Retorno consolidado =====
    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: queryVersionDataBaseValue,
          max_connections: maxConnectionsDataBaseValue,
          count_connections: rountConnectionsDataBaseValue,
        },
      },
      application: applicationInfo,
    });
  } catch (error) {
    console.error("❌ Erro em /api/v1/status:", error);
    response.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export default status;
