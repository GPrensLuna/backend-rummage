import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query, Logger } from '@nestjs/common'
import { UserByEmailUseCase } from '../../application/usecase'
import { ReqUserByEmailDto, ResUserByEmailDto } from '../../application/dtos'

@ApiTags('user')
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
