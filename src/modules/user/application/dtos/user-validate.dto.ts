import { HttpStatus } from '@nestjs/common'
import type { UserEntity } from '../../domain/entities'

export class ReqUserValidateDto implements Pick<UserEntity, 'email'> {
  public readonly email: string = ''
}
export class ReqUserPasswordValidateDto
  implements Pick<UserEntity, 'email' | 'password'>
{
  public readonly email: string = ''
  public readonly password: string = ''
}

export class ResUserValidateDto {
  public readonly isValid: boolean = false
  public readonly message: string = ''
  public readonly email: string = ''

  public constructor(isValid: boolean, email: string, message: string) {
    this.isValid = isValid
    this.message = message
    this.email = email
  }
}

export class EmailValidation {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.CONFLICT
    this.message = 'The user already exists'
  }
}

export class NotEmailValidation {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.NOT_FOUND
    this.message = 'The user not exists'
  }
}
export class UserNotFound {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.NOT_FOUND
    this.message = 'User not found'
  }
}

export class DeletedEmailValidation {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.FORBIDDEN
    this.message = 'Access to this user is blocked'
  }
}

export class ServerError {
  public errorCode: number
  public message: string
  public constructor(location: string) {
    this.errorCode = HttpStatus.INTERNAL_SERVER_ERROR
    this.message = `Internal server error ${location}`
  }
}

export class PasswordEmailValidation {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.UNAUTHORIZED
    this.message = 'Invalid password or user does not exist'
  }
}
export class NotPasswordEmailValidation {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.CONFLICT
    this.message = 'Password is set for this user but should not be'
  }
}
