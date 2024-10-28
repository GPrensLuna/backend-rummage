import { Injectable, Logger } from '@nestjs/common'
import {
  EmailValidation,
  NotEmailValidation,
  ReqUserValidateDto,
} from '../../application/dtos'
import {
  UserValidateEmailPrismaRepository,
  UserValidateNotEmailPrismaRepository,
} from '../../infrastructure/repositories'
import { ExceptionError } from 'src/common/exceptions'

@Injectable()
export class UserValidationEmailService {
  private readonly logger = new Logger(UserValidationEmailService.name)

  public constructor(
    private readonly userValidateEmailPrismaRepository: UserValidateEmailPrismaRepository,
  ) {}

  public async validateEmail(
    reqUserValidate: ReqUserValidateDto,
  ): Promise<void> {
    this.logger.log(`Validating email: ${reqUserValidate.email}`)

    const validationResponse =
      await this.userValidateEmailPrismaRepository.validationEmail(
        reqUserValidate,
      )

    if (validationResponse.isValid) {
      this.logger.error('The user already exists')
      throw new ExceptionError(new EmailValidation())
    }
  }
}

@Injectable()
export class UserValidationNotEmailService {
  private readonly logger = new Logger(UserValidationEmailService.name)

  public constructor(
    private readonly userValidateNotEmailPrismaRepository: UserValidateNotEmailPrismaRepository,
  ) {}

  public async validateNotEmail(
    reqUserValidate: ReqUserValidateDto,
  ): Promise<void> {
    this.logger.log(`Validating email: ${reqUserValidate.email}`)

    const validationResponse =
      await this.userValidateNotEmailPrismaRepository.validateNotEmail(
        reqUserValidate,
      )

    if (validationResponse.isValid) {
      this.logger.error('The user not exists')
      throw new ExceptionError(new NotEmailValidation())
    }
  }
}
