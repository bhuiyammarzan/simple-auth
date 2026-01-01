export class ApiError extends Error {
  public status: number;
  public data: any; // Or null
  public success: boolean;
  public code: string;
  public details: any;

  constructor(
    message: string,
    {
      status = 500,
      code = "INTERNAL_ERROR",
      success = false,
      stack = "",
      details = null,
    } = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.data = null;
    this.message = message;
    this.success = success;
    this.details = details;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request", details: any = null) {
    super(message, {
      status: 400,
      code: "BAD_REQUEST",
      details,
      success: false,
    });
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, {
      status: 401,
      code: "UNAUTHORIZED",
    });
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(message, { status: 403, code: "FORBIDDEN" });
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found") {
    super(message, { status: 404, code: "NOT_FOUND" });
  }
}
