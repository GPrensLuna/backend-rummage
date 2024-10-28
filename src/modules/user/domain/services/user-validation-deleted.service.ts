import { Injectable, Logger } from '@nestjs/common'
import { ExceptionError } from 'src/common/exceptions'
import {
  DeletedEmailValidation,
  ReqUserValidateDto,
} from '../../application/dtos'
import { UserValidateDeletePrismaRepository } from '../../infrastructure/repositories'

@Injectable()
export class UserValidationDeletedService {
  private readonly logger = new Logger(UserValidationDeletedService.name)
  public constructor(
    private readonly userValidateDeletePrismaRepository: UserValidateDeletePrismaRepository,
  ) {}
  public async validateDeleted(
    reqUserValidateDto: ReqUserValidateDto,
  ): Promise<void> {
    this.logger.log(`Validating deleted user: ${reqUserValidateDto.email}`)

    const validationResponse =
      await this.userValidateDeletePrismaRepository.validateDeleted(
        reqUserValidateDto,
      )

    if (validationResponse.isValid) {
      this.logger.error('The user already exists')
      throw new ExceptionError(new DeletedEmailValidation())
    }
  }
}
