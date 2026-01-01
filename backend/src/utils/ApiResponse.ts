export class ApiResponse {
  statusCode: number;
  message: string;
  success: boolean;

  constructor(statusCode: number, payload = {}, message: string = "Success") {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;

    // spread custom fields
    Object.assign(this, payload);
  }
}
