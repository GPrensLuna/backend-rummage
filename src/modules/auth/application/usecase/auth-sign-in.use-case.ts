import { Inject, Injectable, Logger } from '@nestjs/common'
import { ReqAuthSignInDto } from '../dtos'
import { Response } from 'express'
import {
  UserValidationDeletedService,
  UserValidationNotEmailService,
  UserValidationNotPasswordService,
} from 'src/modules/user/domain/services'
import { JwtSignTokenService } from 'src/modules/jwt/domain/services'
import { ReqJwtSignTokenDto } from 'src/modules/jwt/application/dtos'
import { UserByEmailUseCase } from 'src/modules/user/application/usecase'

const SECOND = 1000
const MINUTE = 60
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

    const signIn =
      await this.userByEmailUseCase.getUserByEmail(reqAuthSignInDto)

    const reqJwtSignTokenDto = new ReqJwtSignTokenDto(
      signIn.data.id,
      signIn.data.email,
      signIn.data.name,
    )
    const { accessToken } =
      this.jwtSignTokenService.signToken(reqJwtSignTokenDto)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      maxAge: MINUTE * MINUTE * SECOND,
    })

    this.logger.log('SignIn: Cookie accessToken establecida')

    return {
      accessToken,
    }
  }
}
