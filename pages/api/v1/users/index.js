import database from "infra/database.js";

function validateUserData(username, email) {
  const errors = [];

  if (!username || typeof username !== "string" || username.trim().length === 0) {
    errors.push("Username is required and must be a non-empty string");
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    errors.push("Email is required and must be a non-empty string");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email must be a valid email address");
    }
  }

  return errors;
}

function formatUserResponse(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
  };
}

async function createUser(username, email) {
  const result = await database.query({
    text: "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
    values: [username.trim(), email.trim().toLowerCase()],
  });

  return result.rows[0];
}

async function listUsers() {
  const result = await database.query(
    "SELECT id, username, email, created_at FROM users ORDER BY created_at DESC",
  );

  return result.rows;
}

async function users(request, response) {
  try {
    if (request.method === "POST") {
      const { username, email } = request.body;

      const validationErrors = validateUserData(username, email);
      if (validationErrors.length > 0) {
        return response.status(400).json({
          status: "error",
          message: validationErrors.join(", "),
        });
      }

      try {
        const user = await createUser(username, email);
        return response.status(201).json(formatUserResponse(user));
      } catch (error) {
        if (error.code === "23505") {
          // PostgreSQL unique violation
          return response.status(409).json({
            status: "error",
            message: "Username or email already exists",
          });
        }
        throw error;
      }
    }

    if (request.method === "GET") {
      const usersList = await listUsers();
      return response.status(200).json(usersList);
    }

    return response.status(405).end();
  } catch (error) {
    console.error("Error in users endpoint:", error);
    response.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export default users;

