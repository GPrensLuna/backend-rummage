import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { OutPutUserCreateInterface } from '../../domain/interfaces'
import {
  ReqUserCreateDto,
  ResUserCreateDto,
  ServerError,
} from '../../application/dtos'
import { ExceptionError } from 'src/common/exceptions'

@Injectable()
export class UserPrismaCreateRepository implements OutPutUserCreateInterface {
  private readonly logger = new Logger(UserPrismaCreateRepository.name)

  public constructor(private readonly prismaService: PrismaService) {}

  public async createUser(
    reqUserCreate: ReqUserCreateDto,
  ): Promise<ResUserCreateDto> {
    try {
      this.logger.log('Input' + JSON.stringify(reqUserCreate))

      const resultPrisma = await this.prismaService.user.create({
        data: {
          email: reqUserCreate.email,
          name: reqUserCreate.name,
          password: reqUserCreate.password,
        },
      })

      this.logger.log('Output' + JSON.stringify(resultPrisma.email))
      return {
        email: reqUserCreate.email,
        message: 'User created',
      }
    } catch {
      throw new ExceptionError(new ServerError('create'))
    }
  }
}
