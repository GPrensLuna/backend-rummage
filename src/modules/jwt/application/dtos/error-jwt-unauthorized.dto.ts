import { HttpStatus } from '@nestjs/common'

export class TokenNotProvided {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.UNAUTHORIZED
    this.message =
      'Token no proporcionado. - El token JWT no se ha proporcionado en la solicitud.'
  }
}

export class TokenInvalid {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.UNAUTHORIZED
    this.message = 'Token inválido. - El token JWT proporcionado no es válido.'
  }
}

export class TokenExpired {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.UNAUTHORIZED
    this.message = 'Token expirado. - El token JWT ha expirado.'
  }
}

export class TokenRevoked {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.UNAUTHORIZED
    this.message =
      'Token revocado. - El token JWT ha sido revocado y no es válido.'
  }
}

export class SignatureError {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.NON_AUTHORITATIVE_INFORMATION
    this.message =
      'Error en la firma del token. - La firma del token JWT no es válida.'
  }
}

export class WrongTokenType {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.FORBIDDEN
    this.message =
      'Tipo de token incorrecto. - El tipo de token proporcionado no es el esperado.'
  }
}

export class InsufficientPermissions {
  public errorCode: number
  public message: string
  public constructor() {
    this.errorCode = HttpStatus.FORBIDDEN
    this.message =
      'Falta de permisos. - El token JWT no proporciona los permisos necesarios para acceder a este recurso.'
  }
}
