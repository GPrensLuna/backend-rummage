import { IsNotEmpty, IsString } from 'class-validator'
import type { UserEntity } from '../../domain/entities'

export class ReqUserByEmailDto implements Pick<UserEntity, 'email'> {
  @IsString()
  @IsNotEmpty()
  public readonly email: string = ''
}

export class ResUserByEmailDto {
  public readonly message: string

  public readonly data: {
    id: string
    name: string
    email: string
  }

  public constructor(id: string, name: string, email: string, message: string) {
    this.message = message
    this.data = {
      id: id,
      name: name,
      email: email,
    }
  }
}
