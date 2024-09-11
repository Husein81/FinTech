import axios from "axios";
import { LoginUser, User } from "../../models/User";
import { IAuth } from "../interface/IAuth";
import { api } from "../api";

class AuthRepository implements IAuth {
  public login = async (data: LoginUser): Promise<any> => {
    try {
      const repo = await api.post("/auth/login", data);
      return repo.data;
    } catch (error) {
      console.log(error);
    }
  };

  public register = async (data: LoginUser): Promise<any> => {
    try {
      const response = await api.post<LoginUser>("/auth/register", data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  public verify = async (
    phoneNumber: string,
    verificationCode: string
  ): Promise<void> => {
    try {
      const response = await api.post("/auth/verify", {
        phoneNumber,
        verificationCode,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  public logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }
  };
}

export const authRepository = new AuthRepository();
