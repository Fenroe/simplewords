import { ServerError } from "../types";

export const assignErrorProperties = (error: ServerError) => {
  switch (error.message) {
    case "Validation failed":
      error.statusCode = 406;
      error.status = "The request body could not be successfully validated";
      break;
    case "Email in use":
      error.statusCode = 409;
      error.status = "This email address is associated with another user";
      break;
    case "Invalid credentials":
      error.statusCode = 409;
      error.status = "Invalid email or password";
      break;
    default:
      error.statusCode = 500;
      error.status = "Internal server error";
  }
  return error;
};
