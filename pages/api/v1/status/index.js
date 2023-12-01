import database from "infra/database.js";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    const resultQueryVersionDataBase = await database.query(
      "SELECT split_part(version(), ' ', 2) as version",
    );

    const resultMaxConnectionsDataBase = await database.query(
      "SHOW max_connections;",
    );
    const resultCountConnectionsDataBase = await database.query(
      "SELECT count(*) as count_connections FROM pg_stat_activity;",
    );

    response.status(200).json({
      updated_at: updatedAt,
      database: {
        version: parseFloat(resultQueryVersionDataBase.rows[0].version),
        max_connections: new Number(
          resultMaxConnectionsDataBase.rows[0].max_connections,
        ),
        count_connections: new Number(
          resultCountConnectionsDataBase.rows[0].count_connections,
        ),
      },
    });
  } catch (error) {
    response.status(500).json({ status: error.message });
  }
}

export default status;
