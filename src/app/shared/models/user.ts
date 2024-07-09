export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  creator: string | null;
}

export interface UserRequest {
  username: string | null;
  email: string | null;
  password: string | null;
  confirm_password: string | null;
}
