import { api } from "../api";
import { IUser } from "../interface/IUser";

class UserRepository implements IUser {
  public getUser = async (id: string): Promise<any> => {
    try {
      const response = await api.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export const userRepository = new UserRepository();
