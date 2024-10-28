import { Inject, Injectable, Logger } from '@nestjs/common'

import {
  UserByEmailService,
  UserValidationNotEmailService,
} from '../../domain/services'
import { InPutUserByEmailInterface } from '../../domain/interfaces'
import { ReqUserByEmailDto, ResUserByEmailDto } from '../../application/dtos'

@Injectable()
export class UserByEmailUseCase implements InPutUserByEmailInterface {
  private readonly logger = new Logger(UserByEmailUseCase.name)
  public constructor(
    @Inject(UserByEmailService)
    private readonly userByEmailService: UserByEmailService,
    private readonly userValidationNotEmailService: UserValidationNotEmailService,
  ) {}

  public async getUserByEmail(
    reqUserByEmail: ReqUserByEmailDto,
  ): Promise<ResUserByEmailDto> {
    this.logger.log('Input' + JSON.stringify(reqUserByEmail))

    await this.userValidationNotEmailService.validateNotEmail(reqUserByEmail)
    return this.userByEmailService.getUserByEmail(reqUserByEmail)
  }
}
