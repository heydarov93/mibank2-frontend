export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser {
  sub: string | undefined;
  name: string | undefined;
  family_name: string | undefined;
  email: string | undefined;
}
