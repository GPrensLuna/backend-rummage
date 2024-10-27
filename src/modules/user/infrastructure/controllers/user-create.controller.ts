import { Body, Controller, Logger, Post } from '@nestjs/common'

import { UserCreateUsecase } from '../../application/usecase/user-create.use-case'
import { ReqUserCreateDto, ResUserCreateDto } from '../../application/dtos'

@Controller('user')
export class UserCreateController {
  private readonly logger = new Logger(UserCreateController.name)
  public constructor(private readonly userCreateUsecase: UserCreateUsecase) {}

  @Post()
  public async createUser(
    @Body()
    reqUserCreate: ReqUserCreateDto,
  ): Promise<ResUserCreateDto> {
    this.logger.log('Input' + JSON.stringify(reqUserCreate))
    const resultUserCase =
      await this.userCreateUsecase.createUser(reqUserCreate)
    this.logger.log('Output' + JSON.stringify(resultUserCase))
    return resultUserCase
  }
}
