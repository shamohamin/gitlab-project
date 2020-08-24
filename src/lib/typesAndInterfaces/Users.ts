export interface Users {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  token: string;
  isAuthenticated: boolean;
  authenticationErr?: string;
}
