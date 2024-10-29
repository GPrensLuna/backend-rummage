import { ApiTags } from '@nestjs/swagger'
import { Controller, Delete, Query, Logger } from '@nestjs/common'
import { UserDeleteUseCase } from '../../application/usecase'
import { ResUserDeleteDto, ReqUserDeleteDto } from '../../application/dtos'

@ApiTags('user')
@Controller('user')
export class UserDeleteController {
  private readonly logger = new Logger(UserDeleteController.name)
  public constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}
  @Delete('email')
  public async deleteUser(
    @Query() reqUserDelete: ReqUserDeleteDto,
  ): Promise<ResUserDeleteDto> {
    this.logger.log('Input' + JSON.stringify(reqUserDelete))
    return this.userDeleteUseCase.deleteUser(reqUserDelete)
  }
}
