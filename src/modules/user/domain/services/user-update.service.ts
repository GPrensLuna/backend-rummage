import { Injectable, Logger } from '@nestjs/common'
import { ReqUserUpdateDto, ResUserUpdateDto } from '../../application/dtos'
import { UserPrismaUpdateRepository } from '../../infrastructure/repositories/user-prisma-update.repository'

@Injectable()
export class UserUpdateService {
  private readonly logger = new Logger(UserUpdateService.name)
  public constructor(
    private readonly userPrismaUpdateRepository: UserPrismaUpdateRepository,
  ) {}

  public async updateUser(
    reqUserUpdate: ReqUserUpdateDto,
  ): Promise<ResUserUpdateDto> {
    this.logger.log('Input' + JSON.stringify(reqUserUpdate))

    return this.userPrismaUpdateRepository.updateUser(reqUserUpdate)
  }
}
