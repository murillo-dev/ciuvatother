import { User } from "./user";

export interface Credential {
  user: string;
  password: string;
}


export interface LoginResponse {
  status: string;
  message: string;
  access_token: string;
  refresh_token: string;
  data: User
}
