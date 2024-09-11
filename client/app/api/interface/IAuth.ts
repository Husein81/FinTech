import { LoginUser } from "@/app/models/User";

export interface IAuth {
  login(data: LoginUser): void;
  register(data: LoginUser): void;
  verify(phoneNumber: string, verificationCode: string): void;
  logout(): void;
}
