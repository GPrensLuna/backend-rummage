import { Injectable, Logger } from '@nestjs/common'
import { EmailValidation, ReqUserValidateDto } from '../../application/dtos'
import { UserValidateEmailPrismaRepository } from '../../infrastructure/repositories'
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
