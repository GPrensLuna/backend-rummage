import { Injectable, Logger } from '@nestjs/common'
import { ReqUserDeleteDto, ResUserDeleteDto } from '../../application/dtos'
import { UserPrismaDeleteRepository } from '../../infrastructure/repositories'

@Injectable()
export class UserDeleteService {
  private readonly logger = new Logger(UserDeleteService.name)
  public constructor(
    private readonly userPrismaDeleteRepository: UserPrismaDeleteRepository,
  ) {}

  public async deleteUser(
    reqUserDelete: ReqUserDeleteDto,
  ): Promise<ResUserDeleteDto> {
    this.logger.log('Input' + JSON.stringify(reqUserDelete))

    return this.userPrismaDeleteRepository.deleteUser(reqUserDelete)
  }
}
