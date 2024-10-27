import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { OutPutUserUpdateInterface } from '../../domain/interfaces'
import {
  ReqUserUpdateDto,
  ResUserUpdateDto,
  ServerError,
} from '../../application/dtos'
import { ExceptionError } from 'src/common/exceptions'

@Injectable()
export class UserPrismaUpdateRepository implements OutPutUserUpdateInterface {
  private readonly logger = new Logger(UserPrismaUpdateRepository.name)
  public constructor(private readonly prismaService: PrismaService) {}

  public async updateUser(
    reqUserUpdate: ReqUserUpdateDto,
  ): Promise<ResUserUpdateDto> {
    try {
      this.logger.log('Input' + JSON.stringify(reqUserUpdate))
      await this.prismaService.user.update({
        where: {
          email: reqUserUpdate.email,
        },
        data: {
          name: reqUserUpdate.name,
          email: reqUserUpdate.email,
          password: reqUserUpdate.password,
        },
      })
      this.logger.log('Output')
      return {
        email: reqUserUpdate.email,
        message: 'User updated',
      }
    } catch {
      throw new ExceptionError(new ServerError('update'))
    }
  }
}
