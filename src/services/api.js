import axios from "axios";

/**
 * Axios-based API client for the ACS backend.
 *
 * Why Axios over raw fetch?
 * - Automatic JSON serialisation/deserialisation — no need to call
 *   `res.json()` manually or `JSON.stringify` request bodies.
 * - Request and response interceptors let us attach the JWT token and handle
 *   auth errors (401/403) in one place instead of repeating the logic in
 *   every service file.
 * - Axios throws on non-2xx responses by default, so callers only need to
 *   catch actual errors rather than checking `res.ok` themselves.
 * - Better timeout and cancellation support compared to bare fetch.
 *
 * Configuration is driven by the `VITE_API_URL` environment variable set in
 * `.env.local` (frontend).  Falls back to the default local dev backend if
 * the variable is not present.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/**
 * Request interceptor — automatically attaches the stored JWT as a Bearer
 * token on every outgoing request so individual service functions do not
 * have to worry about authentication headers.
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("acs_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response interceptor — unwraps the Axios response envelope so callers
 * receive the plain `data` object (matching the previous fetch-based API).
 * Also converts Axios error objects into plain Error instances with a
 * human-readable message extracted from the backend JSON body.
 */
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export const api = {
  get: (path, params) => apiClient.get(path, { params }),
  post: (path, body) => apiClient.post(path, body),
  put: (path, body) => apiClient.put(path, body),
  delete: (path) => apiClient.delete(path),
};

export { apiClient };
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
