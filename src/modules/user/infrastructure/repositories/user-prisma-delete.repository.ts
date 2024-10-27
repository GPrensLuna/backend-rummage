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
      this.logger.log('Input: ' + JSON.stringify(reqUserDelete))

      const currentUser = (await this.prismaService.user.findUnique({
        where: { email: reqUserDelete.email },
        select: { isDeleted: true },
      })) as { isDeleted: boolean } | null

      if (!currentUser) {
        throw new ExceptionError(new ServerError('User not found'))
      }

      const newIsDeleted = !currentUser.isDeleted

      await this.prismaService.user.update({
        where: { email: reqUserDelete.email },
        data: { isDeleted: newIsDeleted },
      })

      this.logger.log(
        `User ${reqUserDelete.email} isDeleted set to ${newIsDeleted}`,
      )
      return new ResUserUpdateDto(
        reqUserDelete.email,
        `User delete status updated to ${newIsDeleted}`,
      )
    } catch {
      this.logger.error('Error toggling delete status of user')
      throw new ExceptionError(new ServerError('toggle delete status of user'))
    }
  }
}
