export class LoginPayload {
  email: string;
  password: string;
  constructor() {
    this.email = 'trungk18@gmail.com';
    this.password = `${new Date().getTime()}`;
  }
}
