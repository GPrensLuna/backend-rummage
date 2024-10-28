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
      this.logger.log('Input: ' + JSON.stringify(reqUserUpdate.data))

      const userUpdated = await this.prismaService.user.update({
        where: {
          email: reqUserUpdate.emailQuery,
        },
        data: {
          name: reqUserUpdate.data.name,
          email: reqUserUpdate.data.email,
          password: reqUserUpdate.data.password,
        },
        select: {
          email: true,
          name: true,
          id: true,
        },
      })

      this.logger.log('Output: User updated successfully')
      return new ResUserUpdateDto(
        userUpdated.email,
        `User updated ${userUpdated.email}`,
      )
    } catch (error) {
      this.logger.error('Error while updating user:', error)

      throw new ExceptionError(new ServerError('update'))
    }
  }
}
