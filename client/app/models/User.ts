export interface User {
  _id?: string;
  firstname?: string;
  lastname?: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
  verificationCode: string;
}

export interface LoginUser {
  phoneNumber: string;
  password: string;
}
