export default class RegisterDto {
  constructor(
    first_name: string,
    last_name: string,
    password: string,
    email: string,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.email = email;
  }
  public first_name: string;
  public last_name: string;
  public password: string;
  public email: string;
}
