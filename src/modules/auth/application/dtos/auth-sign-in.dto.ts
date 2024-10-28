import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ReqAuthSignInDto {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string

  @IsString()
  @IsNotEmpty()
  public readonly password: string

  public constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}

export class ReqAuthSignInBody {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string = ''

  @IsString()
  @IsNotEmpty()
  public readonly password: string = ''
}

export class ResAuthSignInDto {
  public readonly email: string = ''

  public constructor(email: string) {
    this.email = email
  }
}
