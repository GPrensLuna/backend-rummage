import { Inject, Injectable, Logger } from '@nestjs/common'
import { ResUserGetAllDto } from '../../application/dtos'
import { UserGetAllService } from '../../domain/services'

@Injectable()
export class UserGetAllUseCase {
  private readonly logger = new Logger(UserGetAllUseCase.name)
  public constructor(
    @Inject(UserGetAllService)
    private readonly userGetAllService: UserGetAllService,
  ) {}
  public async getAllUser(): Promise<ResUserGetAllDto> {
    this.logger.log('Input get all user')

    return this.userGetAllService.getAllUser()
  }
}
