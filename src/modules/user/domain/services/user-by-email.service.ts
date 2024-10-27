import { Injectable, Logger } from '@nestjs/common'
import { ReqUserByEmailDto, ResUserByEmailDto } from '../../application/dtos'
import { UserPrismaByEmailRepository } from '../../infrastructure/repositories/user-prisma-by-email.repository'

@Injectable()
export class UserByEmailService {
  private readonly logger = new Logger(UserByEmailService.name)
  public constructor(
    private readonly userPrismaByEmailRepository: UserPrismaByEmailRepository,
  ) {}
  public async getUserByEmail(
    reqUserByEmail: ReqUserByEmailDto,
  ): Promise<ResUserByEmailDto> {
    this.logger.log('Input' + JSON.stringify(reqUserByEmail))

    return this.userPrismaByEmailRepository.getUserByEmail(reqUserByEmail)
  }
}
