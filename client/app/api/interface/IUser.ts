import { User } from "@/app/models/User";

export interface IUser {
  getUser(id: string): Promise<User>;
}
