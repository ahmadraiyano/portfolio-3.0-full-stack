/** Thrown deliberately in controllers; caught by the global error middleware. */
export class ApiError extends Error {
  statusCode: number;
  details: unknown;
  isOperational: boolean;

  constructor(statusCode: number, message = 'Something went wrong', details: unknown = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
  }
}
