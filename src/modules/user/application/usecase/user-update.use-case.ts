import { Inject, Injectable, Logger } from '@nestjs/common'

import { ReqUserUpdateDto, ResUserUpdateDto } from '../../application/dtos'
import {
  UserUpdateService,
  UserValidationEmailService,
  UserValidationNotEmailService,
} from '../../domain/services'

@Injectable()
export class UserUpdateUseCase {
  private readonly logger = new Logger(UserUpdateUseCase.name)
  public constructor(
    @Inject(UserUpdateService)
    private readonly userUpdateService: UserUpdateService,
    @Inject(UserValidationEmailService)
    private readonly userValidationEmailService: UserValidationEmailService,
    @Inject(UserValidationNotEmailService)
    private readonly userValidationNotEmailService: UserValidationNotEmailService,
  ) {}

  public async updateUser(
    reqUserUpdate: ReqUserUpdateDto,
  ): Promise<ResUserUpdateDto> {
    this.logger.log('Input' + JSON.stringify(reqUserUpdate))

    await this.userValidationNotEmailService.validateNotEmail({
      email: reqUserUpdate.emailQuery,
    })

    await this.userValidationEmailService.validateEmail(reqUserUpdate.data)

    return this.userUpdateService.updateUser(reqUserUpdate)
  }
}
