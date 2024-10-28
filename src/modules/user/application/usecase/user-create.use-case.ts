import { Inject, Injectable, Logger } from '@nestjs/common'
import { ReqUserCreateDto, ResUserCreateDto } from '../dtos'
import { UserCreateService } from '../../domain/services'
import { UserValidationEmailService } from '../../domain/services/user-validation-email.service'
import { InPutUserCreateInterface } from '../../domain/interfaces'

@Injectable()
export class UserCreateUsecase implements InPutUserCreateInterface {
  private readonly logger = new Logger(UserCreateUsecase.name)

  public constructor(
    @Inject(UserCreateService)
    private readonly userCreateService: UserCreateService,

    @Inject(UserValidationEmailService)
    private readonly userValidationEmailService: UserValidationEmailService,
  ) {}

  public async createUser(
    reqUserCreate: ReqUserCreateDto,
  ): Promise<ResUserCreateDto> {
    this.logger.log('Input: ' + JSON.stringify(reqUserCreate))

    await this.userValidationEmailService.validateEmail(reqUserCreate)

    return this.userCreateService.createUser(reqUserCreate)
  }
}
