import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator'
import type { UserEntity } from '../../domain/entities'
import { DTOS } from './constant'

export class ReqUserUpdate
  implements Pick<UserEntity, 'name' | 'email' | 'password'>
{
  @IsString()
  @IsNotEmpty()
  public readonly name: string = ''

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string = ''

  @IsString()
  @IsNotEmpty()
  @MinLength(DTOS.password.minLength)
  @MaxLength(DTOS.password.maxLength)
  @Matches(DTOS.regex.regexLowercase, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(DTOS.regex.regexUppercase, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(DTOS.regex.regexSpecial, {
    message: `Password must contain at least one special character ${DTOS.regex.regexSpecial}`,
  })
  public readonly password: string = ''
}

export class ReqUserUpdateDto {
  public readonly emailQuery: string = ''
  public readonly data: {
    name: string
    email: string
    password: string
  }

  public constructor(
    emailQuery: string,
    data: { name: string; email: string; password: string },
  ) {
    this.emailQuery = emailQuery
    this.data = data
  }
}

export class ResUserUpdateDto implements Pick<UserEntity, 'email'> {
  public readonly email: string = ''
  public readonly message: string = 'User updated'

  public constructor(email: string, message: string) {
    this.email = email
    this.message = message
  }
}
