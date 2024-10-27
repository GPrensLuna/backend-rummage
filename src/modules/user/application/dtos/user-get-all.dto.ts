export class ResUserGetAllDto {
  public readonly message: string
  public readonly userData: {
    id: string
    name: string | null
    email: string
  }[]

  public constructor(
    message: string,
    users: { id: string; name: string | null; email: string }[],
  ) {
    this.message = message
    this.userData = users
  }
}
