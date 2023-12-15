import database from "infra/database.js";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    const queryVersionDataBaseResult = await database.query(
      "SHOW server_version;",
    );
    queryVersionDataBaseValue = parseInt(queryVersionDataBaseResult.rows[0]);

    const maxConnectionsDataBaseResult = await database.query(
      "SHOW max_connections;",
    );
    maxConnectionsDataBaseValue = parseInt(
      maxConnectionsDataBaseResult.rows[0],
    );

    const rountConnectionsDataBaseResult = await database.query(
      "SELECT count(*) as count_connections FROM pg_stat_activity;",
    );
    rountConnectionsDataBaseValue = parseInt(
      rountConnectionsDataBaseResult.rows[0],
    );

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: queryVersionDataBaseValue,
          max_connections: maxConnectionsDataBaseValue,
          count_connections: rountConnectionsDataBaseValue,
        },
      },
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export default status;
