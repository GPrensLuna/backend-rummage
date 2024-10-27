import { Inject, Injectable, Logger } from '@nestjs/common'
import { ReqUserDeleteDto, ResUserDeleteDto } from '../../application/dtos'

import {
  UserDeleteService,
  UserValidationDeletedService,
} from '../../domain/services'

@Injectable()
export class UserDeleteUseCase {
  private readonly logger = new Logger(UserDeleteUseCase.name)
  public constructor(
    @Inject(UserDeleteService)
    private readonly userDeleteService: UserDeleteService,
    @Inject(UserValidationDeletedService)
    private readonly userValidationDeletedService: UserValidationDeletedService,
  ) {}

  public async deleteUser(
    reqUserDelete: ReqUserDeleteDto,
  ): Promise<ResUserDeleteDto> {
    this.logger.log('Input' + JSON.stringify(reqUserDelete))

    await this.userValidationDeletedService.validateDeleted(reqUserDelete)
    return this.userDeleteService.deleteUser(reqUserDelete)
  }
}
