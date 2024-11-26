export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  date_of_birth: string;
  is_admin: boolean;
  is_trainer: boolean;
  is_student: boolean;
}

export interface ISignInResponse {
  access: string;
  refresh: string;
  user: IUser;
}
