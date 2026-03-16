const jwt = require("jsonwebtoken");

/**
 * Authentication and authorisation middleware.
 *
 * The ACS API uses JSON Web Tokens (JWT) for stateless authentication.
 * When a user logs in successfully, the backend signs a JWT containing the
 * user's ID, username, and role, then sends it to the client.  The client
 * stores the token (in localStorage) and attaches it as a Bearer token on
 * every subsequent request via the `Authorization` header.
 *
 * Stateless auth means the server does NOT store sessions in memory or in
 * the database — the token itself is the proof of identity.  This makes the
 * API horizontally scalable and avoids sticky-session requirements.
 *
 * The secret key used to sign tokens is read from the `JWT_SECRET`
 * environment variable.  Never commit a real secret to source control.
 */

/**
 * Express middleware that verifies the JWT on protected routes.
 *
 * Flow:
 * 1. Extract the token from the `Authorization: Bearer <token>` header.
 * 2. Verify the token's signature and expiry using the shared secret.
 * 3. Attach the decoded payload (id, username, role) to `req.user` so
 *    downstream route handlers can access the caller's identity without
 *    re-reading the database.
 * 4. Call `next()` to pass control to the route handler, or return a
 *    401/403 response if the token is missing or invalid.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "acs_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

/**
 * Factory that returns an Express middleware enforcing role-based access.
 *
 * Usage:
 *   router.delete("/:id", authenticate, authorize("admin"), handler);
 *
 * The middleware must be placed AFTER `authenticate` so that `req.user` is
 * already populated when the role check runs.
 *
 * @param {...string} roles - One or more role strings that are allowed to
 *   access the route (e.g. "admin", "faculty").
 * @returns {import("express").RequestHandler}
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
