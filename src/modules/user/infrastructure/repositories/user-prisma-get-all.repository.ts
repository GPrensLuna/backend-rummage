import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import {
  ResUserGetAllDto,
  ServerError,
  UserNotFound,
} from '../../application/dtos'
import { ExceptionError } from 'src/common/exceptions'

const CERO = 0
@Injectable()
export class UserPrismaGetAllRepository {
  private readonly logger = new Logger(UserPrismaGetAllRepository.name)
  public constructor(private readonly prismaService: PrismaService) {}
  public async getAllUser(): Promise<ResUserGetAllDto> {
    try {
      this.logger.log('Input user db')
      const resultPrisma = await this.prismaService.user.findMany({
        select: { id: true, name: true, email: true },
      })
      this.logger.log('Output user db result')

      if (resultPrisma.length === CERO) {
        throw new ExceptionError(new UserNotFound())
      }

      const userData = resultPrisma.map((user) => ({
        id: user.id,
        name: user.name ?? 'Name not found',
        email: user.email,
      }))

      return new ResUserGetAllDto('User found', userData)
    } catch {
      throw new ExceptionError(new ServerError('all user'))
    }
  }
}
