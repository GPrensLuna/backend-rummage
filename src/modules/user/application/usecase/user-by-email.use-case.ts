import { Inject, Injectable, Logger } from '@nestjs/common'

import { UserByEmailService } from '../../domain/services'
import { InPutUserByEmailInterface } from '../../domain/interfaces'
import { ReqUserByEmailDto, ResUserByEmailDto } from '../../application/dtos'

@Injectable()
export class UserByEmailUseCase implements InPutUserByEmailInterface {
  private readonly logger = new Logger(UserByEmailUseCase.name)
  public constructor(
    @Inject(UserByEmailService)
    private readonly userByEmailService: UserByEmailService,
  ) {}

  public async getUserByEmail(
    reqUserByEmail: ReqUserByEmailDto,
  ): Promise<ResUserByEmailDto> {
    this.logger.log('Input' + JSON.stringify(reqUserByEmail))

    return this.userByEmailService.getUserByEmail(reqUserByEmail)
  }
}
