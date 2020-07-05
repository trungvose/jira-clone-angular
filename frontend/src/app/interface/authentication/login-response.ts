export class TokenResultApi {
  token: string;
  expiry: string;
}

export class LoginPayload {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
