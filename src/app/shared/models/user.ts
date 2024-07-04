export interface User {
  id: string;
  unsename: string;
  email: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  creator: string | null;
}
