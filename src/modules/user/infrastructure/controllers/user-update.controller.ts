import { ApiTags } from '@nestjs/swagger'
import { Controller, Query, Body, Logger, Patch } from '@nestjs/common'
import { UserUpdateUseCase } from '../../application/usecase'
import {
  ReqUserByEmailDto,
  ReqUserUpdate,
  ReqUserUpdateDto,
  ResUserUpdateDto,
} from '../../application/dtos'

@ApiTags('user')
@Controller('user')
export class UserUpdateController {
  private readonly logger = new Logger(UserUpdateController.name)
  public constructor(private readonly userUpdateUseCase: UserUpdateUseCase) {}
  @Patch('email')
  public async updateUser(
    @Query() reqUserByEmail: ReqUserByEmailDto,
    @Body() reqUserUpdate: ReqUserUpdate,
  ): Promise<ResUserUpdateDto> {
    this.logger.log('Input' + JSON.stringify(reqUserUpdate))

    return this.userUpdateUseCase.updateUser(
      new ReqUserUpdateDto(reqUserByEmail.email, reqUserUpdate),
    )
  }
}
