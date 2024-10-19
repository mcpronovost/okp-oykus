/**
 * please set any environment variables in .env file in the root of the project
 * then import them here using import.meta.env.VARIABLE_NAME
 * @type {{API_URL: (any|string), BACKEND_URL: (any|string), SOCKET_URL: (any|string)}}
 */
export const config = {
  BACKEND_URL: import.meta.env.PUBLIC_BACKEND_URL || process.env.PUBLIC_BACKEND_URL || "/",
  API_URL: import.meta.env.PUBLIC_API_URL || process.env.PUBLIC_API_URL || "/api/",
  SOCKET_URL: "/",
};
