import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common'
import { ReqAuthSignInBody, ReqAuthSignInDto } from '../../application/dtos'
import { Public } from '../../../jwt/infrastructure/decorators'
import { AuthSignInUseCase } from '../../application/usecase'
import { Response } from 'express'

@Controller('auth')
export class AuthSignInController {
  private readonly logger = new Logger(AuthSignInController.name)

  public constructor(private readonly authSignInUseCase: AuthSignInUseCase) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() reqAuthSignInBody: ReqAuthSignInBody,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    this.logger.log('SignIn : Entrada', reqAuthSignInBody)

    const reqAuthSignInDto = new ReqAuthSignInDto(
      reqAuthSignInBody.email,
      reqAuthSignInBody.password,
    )

    await this.authSignInUseCase.execute(reqAuthSignInDto, res)
  }
}
