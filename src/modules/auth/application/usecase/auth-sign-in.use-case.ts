/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ReqAuthSignInDto, ResUserByEmailDto } from '../dtos'
import { Response } from 'express'
import {
  UserValidationDeletedService,
  UserValidationNotEmailService,
  UserValidationNotPasswordService,
} from 'src/modules/user/domain/services'
import { JwtSignTokenService } from 'src/modules/jwt/domain/services'
import { ReqJwtSignTokenDto } from 'src/modules/jwt/application/dtos'
import { UserByEmailUseCase } from 'src/modules/user/application/usecase'

@Injectable()
export class AuthSignInUseCase {
  private readonly logger = new Logger(AuthSignInUseCase.name)

  public constructor(
    @Inject(UserValidationNotEmailService)
    private readonly userValidationNotEmailService: UserValidationNotEmailService,

    @Inject(UserValidationDeletedService)
    private readonly userValidationDeletedService: UserValidationDeletedService,

    @Inject(UserValidationNotPasswordService)
    private readonly userValidationNotPasswordService: UserValidationNotPasswordService,

    @Inject(JwtSignTokenService)
    private readonly jwtSignTokenService: JwtSignTokenService,

    @Inject(UserByEmailUseCase)
    private readonly userByEmailUseCase: UserByEmailUseCase,
  ) {}

  public async execute(
    reqAuthSignInDto: ReqAuthSignInDto,
    res: Response,
  ): Promise<{ accessToken: string }> {
    this.logger.log('AuthSignInUseCase - Entrada:', reqAuthSignInDto)

    await this.userValidationNotEmailService.validateNotEmail(reqAuthSignInDto)
    await this.userValidationDeletedService.validateDeleted(reqAuthSignInDto)
    await this.userValidationNotPasswordService.validatePassword(
      reqAuthSignInDto,
    )

    const signIn: ResUserByEmailDto | null | undefined =
      await this.userByEmailUseCase.getUserByEmail(reqAuthSignInDto)

    if (!signIn) {
      this.logger.error('AuthSignInUseCase - Error: Usuario no encontrado')
      throw new Error('Usuario no encontrado')
    }

    const reqJwtSignTokenDto = new ReqJwtSignTokenDto(
      signIn.data.email,
      signIn.data.id,
    )
    const { accessToken } =
      this.jwtSignTokenService.signToken(reqJwtSignTokenDto)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      maxAge: 60 * 60 * 1000,
    })

    this.logger.log('SignIn: Cookie accessToken establecida')

    return {
      accessToken,
    }
  }
}
