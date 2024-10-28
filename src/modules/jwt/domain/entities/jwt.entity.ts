export class JwtEntity {
  public email: string
  public role: string
  public id: string
  public username: string

  public constructor(
    email: string,
    role: string,
    id: string,
    username: string,
  ) {
    this.email = email
    this.role = role
    this.id = id
    this.username = username
  }
}
