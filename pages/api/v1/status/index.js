import database from "../../../../infra/database.js";

async function status(request, response) {
  try {
    const result = await database.query("SELECT 1 + 1");
    response.status(200).json({ status: result.result });
  } catch (error) {
    response.status(500).json({ status: error.message });
  }
}

export default status;
