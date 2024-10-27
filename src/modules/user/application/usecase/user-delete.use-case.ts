import { Inject, Injectable, Logger } from '@nestjs/common'
import { ReqUserDeleteDto, ResUserDeleteDto } from '../../application/dtos'

import { UserDeleteService } from '../../domain/services'

@Injectable()
export class UserDeleteUseCase {
  private readonly logger = new Logger(UserDeleteUseCase.name)
  public constructor(
    @Inject(UserDeleteService)
    private readonly userDeleteService: UserDeleteService,
  ) {}

  public async deleteUser(
    reqUserDelete: ReqUserDeleteDto,
  ): Promise<ResUserDeleteDto> {
    this.logger.log('Input' + JSON.stringify(reqUserDelete))

    return this.userDeleteService.deleteUser(reqUserDelete)
  }
}
