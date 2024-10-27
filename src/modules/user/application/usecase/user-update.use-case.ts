import { Inject, Injectable, Logger } from '@nestjs/common'

import { ReqUserUpdateDto, ResUserUpdateDto } from '../../application/dtos'
import { UserUpdateService } from '../../domain/services'

@Injectable()
export class UserUpdateUseCase {
  private readonly logger = new Logger(UserUpdateUseCase.name)
  public constructor(
    @Inject(UserUpdateService)
    private readonly userUpdateService: UserUpdateService,
  ) {}

  public async updateUser(
    reqUserUpdate: ReqUserUpdateDto,
  ): Promise<ResUserUpdateDto> {
    this.logger.log('Input' + JSON.stringify(reqUserUpdate))

    return this.userUpdateService.updateUser(reqUserUpdate)
  }
}
