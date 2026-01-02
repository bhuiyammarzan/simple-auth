export interface UserType {
  name: string;
  email: string;
  role: string;
}

export interface ApiResponseType {
  statusCode: string;
  success: string;
  message: string;
  user: UserType;
  token?: string;
}
