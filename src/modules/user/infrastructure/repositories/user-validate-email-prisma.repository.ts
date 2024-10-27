import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import {
  ReqUserValidateDto,
  ResUserValidateDto,
  ServerError,
} from '../../application/dtos'
import { OutPutUserValidationEmailInterface } from '../../domain/interfaces'
import { ExceptionError } from '../../../../common/exceptions'

@Injectable()
export class UserValidateEmailPrismaRepository
  implements OutPutUserValidationEmailInterface
{
  private readonly logger = new Logger(UserValidateEmailPrismaRepository.name)

  public constructor(private readonly prismaService: PrismaService) {}

  public async validationEmail(
    reqUserValidate: ReqUserValidateDto,
  ): Promise<ResUserValidateDto> {
    try {
      this.logger.log('Input' + JSON.stringify(reqUserValidate))

      const resultPrisma = await this.prismaService.user.findUnique({
        where: {
          email: reqUserValidate.email,
        },
      })

      this.logger.log('Output' + JSON.stringify(resultPrisma))
      return new ResUserValidateDto(
        Boolean(resultPrisma),
        reqUserValidate.email,
        resultPrisma ? 'User exists' : 'User does not exist',
      )
    } catch {
      throw new ExceptionError(new ServerError('validate email'))
    }
  }
}
