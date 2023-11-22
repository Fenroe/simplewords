export interface AppUser extends Express.User {
  password: string;
  id: number;
  email: string;
}
