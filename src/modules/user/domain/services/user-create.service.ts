import { Injectable, Logger } from '@nestjs/common'
import { ReqUserCreateDto, ResUserCreateDto } from '../../application/dtos'
import { UserPrismaCreateRepository } from '../../infrastructure/repositories/user-prisma-create.repository'

@Injectable()
export class UserCreateService {
  private readonly logger = new Logger(UserCreateService.name)

  public constructor(
    private readonly userPrismaCreateRepository: UserPrismaCreateRepository,
  ) {}

  public async createUser(
    reqUserCreate: ReqUserCreateDto,
  ): Promise<ResUserCreateDto> {
    this.logger.log('input' + JSON.stringify(reqUserCreate))

    return this.userPrismaCreateRepository.createUser(reqUserCreate)
  }
}
