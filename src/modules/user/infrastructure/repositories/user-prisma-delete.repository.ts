import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import {
  ReqUserDeleteDto,
  ResUserUpdateDto,
  ServerError,
} from '../../application/dtos'
import { OutPutUserDeleteInterface } from '../../domain/interfaces'
import { ExceptionError } from 'src/common/exceptions'

@Injectable()
export class UserPrismaDeleteRepository implements OutPutUserDeleteInterface {
  private readonly logger = new Logger(UserPrismaDeleteRepository.name)
  public constructor(private readonly prismaService: PrismaService) {}

  public async deleteUser(
    reqUserDelete: ReqUserDeleteDto,
  ): Promise<ResUserUpdateDto> {
    try {
      this.logger.log('Input' + JSON.stringify(reqUserDelete))
      await this.prismaService.user.update({
        where: {
          email: reqUserDelete.email,
        },
        data: {
          isDeleted: true,
        },
      })
      return new ResUserUpdateDto(reqUserDelete.email, 'User deleted')
    } catch {
      this.logger.error('Error deleting user')
      throw new ExceptionError(new ServerError('delete user'))
    }
  }
}
