import { IsNotEmpty, IsString } from 'class-validator'
import type { UserEntity } from '../../domain/entities'

export class ReqUserDeleteDto implements Pick<UserEntity, 'email'> {
  @IsString()
  @IsNotEmpty()
  public readonly email: string = ''
}

export class ResUserDeleteDto implements Pick<UserEntity, 'email'> {
  public readonly email: string = ''
  public readonly message: string = ''

  public constructor(email: string, message: string) {
    this.email = email
    this.message = message
  }
}
