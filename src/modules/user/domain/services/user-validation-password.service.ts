import { Injectable, Logger } from '@nestjs/common'
import {
  NotPasswordEmailValidation,
  PasswordEmailValidation,
  ReqUserPasswordValidateDto,
  ResUserValidateDto,
} from '../../application/dtos'
import {
  UserValidateNotPasswordPrismaRepository,
  UserValidateIsPasswordPrismaRepository,
} from '../../infrastructure/repositories'
import { ExceptionError } from 'src/common/exceptions'

// Servicio para validar cuando se espera que el usuario tenga una contraseña
@Injectable()
export class UserValidationIsPasswordService {
  private readonly logger = new Logger(UserValidationIsPasswordService.name)

  public constructor(
    private readonly userValidateIsPasswordPrismaRepository: UserValidateIsPasswordPrismaRepository,
  ) {}

  public async validatePassword(
    reqUserValidate: ReqUserPasswordValidateDto,
  ): Promise<void> {
    this.logger.log('Input: ' + JSON.stringify(reqUserValidate))

    const resultPrisma: ResUserValidateDto =
      await this.userValidateIsPasswordPrismaRepository.validatePassword(
        reqUserValidate,
      )

    if (resultPrisma.isValid) {
      this.logger.error(
        'Password validation failed - User not found or invalid password',
      )
      throw new ExceptionError(new PasswordEmailValidation())
    }
  }
}

// Servicio para validar cuando se espera que el usuario no tenga una contraseña
@Injectable()
export class UserValidationNotPasswordService {
  private readonly logger = new Logger(UserValidationNotPasswordService.name)

  public constructor(
    private readonly userValidateNotPasswordPrismaRepository: UserValidateNotPasswordPrismaRepository,
  ) {}

  public async validatePassword(
    reqUserValidate: ReqUserPasswordValidateDto,
  ): Promise<void> {
    this.logger.log('Input: ' + JSON.stringify(reqUserValidate))

    const resultPrisma =
      await this.userValidateNotPasswordPrismaRepository.validatePassword(
        reqUserValidate,
      )

    if (!resultPrisma.isValid) {
      this.logger.error(
        'Validation failed - Password should not be set for this user',
      )
      throw new ExceptionError(new NotPasswordEmailValidation())
    }
  }
}
