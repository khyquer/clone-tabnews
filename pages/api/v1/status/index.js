import database from "infra/database.js";

async function querySingleValue(query, params = []) {
  const result = await database.query({
    text: query,
    values: params,
  });

  const value = Object.values(result.rows[0])[0];
  return isNaN(value) ? value : parseInt(value);
}

export default async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();
    const databaseName = process.env.POSTGRES_DB;

    const [version, maxConnections, countConnections] = await Promise.all([
      querySingleValue("SHOW server_version;"),
      querySingleValue("SHOW max_connections;"),
      querySingleValue(
        "SELECT count(*)::int as count_connections FROM pg_stat_activity WHERE datname = $1",
        [databaseName],
      ),
    ]);

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version,
          max_connections: maxConnections,
          count_connections: countConnections,
        },
      },
    });
  } catch (error) {
    console.error("Erro em /api/v1/status:", error.message);
    response.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
