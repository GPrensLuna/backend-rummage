import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { InPutUserByEmailInterface } from '../../domain/interfaces'
import {
  ReqUserByEmailDto,
  ResUserByEmailDto,
  ServerError,
} from '../../application/dtos'
import { UserEntity } from '../../domain/entities'
import { ExceptionError } from 'src/common/exceptions'

@Injectable()
export class UserPrismaByEmailRepository implements InPutUserByEmailInterface {
  private readonly logger = new Logger(UserPrismaByEmailRepository.name)

  public constructor(private readonly prismaService: PrismaService) {}

  public async getUserByEmail(
    reqUserCreate: ReqUserByEmailDto,
  ): Promise<ResUserByEmailDto> {
    try {
      this.logger.log('Input' + JSON.stringify(reqUserCreate))
      const { email } = reqUserCreate

      const user = (await this.prismaService.user.findUnique({
        where: {
          email,
        },
        select: {
          email: true,
          name: true,
          id: true,
        },
      })) as Partial<UserEntity>

      this.logger.log('Output' + JSON.stringify(user))

      if (
        typeof user.id !== 'string' ||
        typeof user.name !== 'string' ||
        typeof user.email !== 'string'
      ) {
        throw new Error('User details are incomplete')
      }

      return new ResUserByEmailDto(user.id, user.name, user.email, 'User found')
    } catch {
      throw new ExceptionError(new ServerError('by email'))
    }
  }
}
