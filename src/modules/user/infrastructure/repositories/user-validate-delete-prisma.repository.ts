import { Injectable, Logger } from '@nestjs/common'
import { OutPutUserValidationIsDeletedInterface } from '../../domain/interfaces'
import {
  ReqUserValidateDto,
  ResUserValidateDto,
  ServerError,
} from '../../application/dtos'
import { PrismaService } from '../../../prisma/prisma.service'

import { ExceptionError } from '../../../../common/exceptions'

@Injectable()
export class UserValidateDeletePrismaRepository
  implements OutPutUserValidationIsDeletedInterface
{
  private readonly logger = new Logger(UserValidateDeletePrismaRepository.name)

  public constructor(private readonly prismaService: PrismaService) {}

  public async validateDeleted(
    reqUserValidate: ReqUserValidateDto,
  ): Promise<ResUserValidateDto> {
    try {
      this.logger.log('Input: ' + JSON.stringify(reqUserValidate))

      const resultPrisma = (await this.prismaService.user.findUnique({
        where: {
          email: reqUserValidate.email,
        },
        select: {
          isDeleted: true,
        },
      })) as { isDeleted: boolean } | null

      this.logger.log('Output: ' + JSON.stringify(resultPrisma))

      const isDeleted = resultPrisma?.isDeleted ?? false

      return new ResUserValidateDto(
        Boolean(isDeleted),
        reqUserValidate.email,
        isDeleted ? 'User deleted' : 'User not deleted',
      )
    } catch {
      throw new ExceptionError(new ServerError('validate delete failed'))
    }
  }
}
