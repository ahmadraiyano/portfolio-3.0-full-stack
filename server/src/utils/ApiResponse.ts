/** Consistent success envelope for every endpoint: { success, message, data }. */
export class ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;

  constructor(statusCode: number, data: T, message = 'Success') {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
