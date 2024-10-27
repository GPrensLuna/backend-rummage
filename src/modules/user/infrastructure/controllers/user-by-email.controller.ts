import { Controller, Get, Query, Logger } from '@nestjs/common'
import { ReqUserByEmailDto, ResUserByEmailDto } from '../../application/dtos'
import { UserByEmailUseCase } from '../../application/usecase'

@Controller('user')
export class UserByEmailController {
  private readonly logger = new Logger(UserByEmailController.name)

  public constructor(private readonly userByEmailUseCase: UserByEmailUseCase) {}

  @Get('email')
  public async getUserByEmail(
    @Query() reqUserByEmail: ReqUserByEmailDto,
  ): Promise<ResUserByEmailDto> {
    this.logger.log('Input' + JSON.stringify(reqUserByEmail))

    return this.userByEmailUseCase.getUserByEmail(reqUserByEmail)
  }
}
