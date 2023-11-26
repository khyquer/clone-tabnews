import database from "infra/database.js";

async function status(request, response) {
  try {
    const result = await database.query("SELECT 1 + 1 as result");
    response.status(200).json({ status: result.rows[0] });
  } catch (error) {
    response.status(500).json({ status: error.message });
  }
}

export default status;
