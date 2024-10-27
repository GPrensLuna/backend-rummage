import { Controller, Delete, Query } from '@nestjs/common'
import { UserDeleteUseCase } from '../../application/usecase'
import { ResUserDeleteDto, ReqUserDeleteDto } from '../../application/dtos'

@Controller('user')
export class UserDeleteController {
  public constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}
  @Delete('email')
  public async deleteUser(
    @Query() reqUserDelete: ReqUserDeleteDto,
  ): Promise<ResUserDeleteDto> {
    return this.userDeleteUseCase.deleteUser(reqUserDelete)
  }
}
