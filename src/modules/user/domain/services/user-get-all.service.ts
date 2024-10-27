import { Injectable, Logger } from '@nestjs/common'
import { ResUserGetAllDto } from '../../application/dtos'
import { UserPrismaGetAllRepository } from '../../infrastructure/repositories/user-prisma-get-all.repository'

@Injectable()
export class UserGetAllService {
  private readonly logger = new Logger(UserGetAllService.name)
  public constructor(
    private readonly userPrismaGetAllRepository: UserPrismaGetAllRepository,
  ) {}
  public async getAllUser(): Promise<ResUserGetAllDto> {
    this.logger.log('Input user')

    return this.userPrismaGetAllRepository.getAllUser()
  }
}
