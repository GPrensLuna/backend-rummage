import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import {
  ReqUserPasswordValidateDto,
  ResUserValidateDto,
  ServerError,
} from '../../application/dtos'
import { OutPutUserValidationIsPasswordInterface } from '../../domain/interfaces'
import { ExceptionError } from '../../../../common/exceptions'

@Injectable()
export class UserValidateIsPasswordPrismaRepository
  implements OutPutUserValidationIsPasswordInterface
{
  private readonly logger = new Logger(
    UserValidateIsPasswordPrismaRepository.name,
  )

  public constructor(private readonly prismaService: PrismaService) {}

  public async validatePassword(
    reqUserValidate: ReqUserPasswordValidateDto,
  ): Promise<ResUserValidateDto> {
    try {
      this.logger.log('Input' + JSON.stringify(reqUserValidate))

      const resultPrisma = await this.prismaService.user.findUnique({
        where: {
          email: reqUserValidate.email,
        },
        select: {
          password: true,
        },
      })

      if (!resultPrisma) {
        return new ResUserValidateDto(
          false,
          reqUserValidate.email,
          'User does not exist',
        )
      }

      if (resultPrisma.password !== reqUserValidate.password) {
        return new ResUserValidateDto(
          false,
          reqUserValidate.email,
          'User does not exist',
        )
      }

      this.logger.log('Output' + JSON.stringify(resultPrisma))
      return new ResUserValidateDto(
        Boolean(resultPrisma),
        reqUserValidate.email,
        'User does not exist',
      )
    } catch {
      throw new ExceptionError(new ServerError('validate email'))
    }
  }
}
@Injectable()
export class UserValidateNotPasswordPrismaRepository
  implements OutPutUserValidationIsPasswordInterface
{
  private readonly logger = new Logger(
    UserValidateNotPasswordPrismaRepository.name,
  )

  public constructor(private readonly prismaService: PrismaService) {}

  public async validatePassword(
    reqUserValidate: ReqUserPasswordValidateDto,
  ): Promise<ResUserValidateDto> {
    try {
      this.logger.log('Input' + JSON.stringify(reqUserValidate))

      const resultPrisma = await this.prismaService.user.findUnique({
        where: {
          email: reqUserValidate.email,
        },
        select: {
          password: true,
        },
      })

      if (!resultPrisma) {
        return new ResUserValidateDto(
          false,
          reqUserValidate.email,
          'User does not exist',
        )
      }

      if (resultPrisma.password !== reqUserValidate.password) {
        return new ResUserValidateDto(
          false,
          reqUserValidate.email,
          'User does not exist',
        )
      }

      this.logger.log('Output' + JSON.stringify(resultPrisma))
      return new ResUserValidateDto(
        Boolean(resultPrisma),
        reqUserValidate.email,
        'User does not exist',
      )
    } catch {
      throw new ExceptionError(new ServerError('validate email'))
    }
  }
}
