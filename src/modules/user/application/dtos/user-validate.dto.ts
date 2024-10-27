import { HttpStatus } from '@nestjs/common'
import type { UserEntity } from '../../domain/entities'

export class ReqUserValidateDto implements Pick<UserEntity, 'email'> {
  public readonly email: string = ''
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

export class UserNotFound {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.NOT_FOUND
    this.message = 'User not found'
  }
}

export class UserDeleted {
  public errorCode: number
  public message: string

  public constructor() {
    this.errorCode = HttpStatus.NOT_FOUND
    this.message = 'User not found'
  }
}

export class ServerError {
  public errorCode: number
  public message: string
  public timestamp: string

  public constructor(location: string) {
    this.errorCode = HttpStatus.INTERNAL_SERVER_ERROR
    this.message = `Internal server error ${location}`
    this.timestamp = new Date().toISOString()
  }
}
