export interface User {
  user: any;
  _id?: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
  verificationCode: string;
}

export interface LoginUser {
  phoneNumber: string;
  password: string;
}
