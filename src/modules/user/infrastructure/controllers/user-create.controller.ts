import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Logger, Post } from '@nestjs/common'
import { ReqUserCreateDto, ResUserCreateDto } from '../../application/dtos'
import { UserCreateUsecase } from '../../application/usecase/user-create.use-case'

@ApiTags('user')
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

    return this.userCreateUsecase.createUser(reqUserCreate)
  }
}
