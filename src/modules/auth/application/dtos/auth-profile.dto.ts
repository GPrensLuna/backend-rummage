import { HttpStatus } from '@nestjs/common'
import type { Request } from 'express'
import type { UserEntity } from 'src/modules/user/domain/entities'

export class UserDataDto implements Pick<UserEntity, 'id' | 'email' | 'name'> {
  public id = ''
  public email = ''
  public name = ''
}
export class ResUserDataDto
  implements Pick<UserEntity, 'id' | 'email' | 'name'>
{
  public id = ''
  public email = ''
  public name = ''
  public constructor(session: Pick<UserEntity, 'id' | 'email' | 'name'>) {
    this.id = session.id
    this.email = session.email
    this.name = session.name
  }
}

export class UserResponseDto {
  public message = ''

  public data?: UserDataDto
  public accessToken?: string
}

export interface AuthRequest extends Request {
  user: UserDataDto
}

export class TokenNotProvided {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.UNAUTHORIZED
    this.message =
      'Token no proporcionado. - El token JWT no se ha proporcionado en la solicitud.'
  }
}
