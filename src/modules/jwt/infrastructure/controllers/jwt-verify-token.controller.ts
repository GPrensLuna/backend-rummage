import { Controller, Post, Body } from '@nestjs/common'
import {
  TokenNotProvided,
  type ReqJwtVerifyTokenDto,
  type ResJwtSignTokenDto,
} from '../../application/dtos'
import { ExceptionError } from '../../../../common/exceptions'
import { JwtVerifyTokenUseCase } from '../../application/usecase'

@Controller('auth')
export class JwtVerifyTokenController {
  public constructor(
    private readonly jwtVerifyTokenUseCase: JwtVerifyTokenUseCase,
  ) {}

  @Post('verify')
  public async verify(
    @Body() reqJwtVerifyTokenDto: ReqJwtVerifyTokenDto,
  ): Promise<ResJwtSignTokenDto> {
    try {
      return await this.jwtVerifyTokenUseCase.verifyToken(reqJwtVerifyTokenDto)
    } catch (error) {
      if (error instanceof ExceptionError) {
        throw error
      }
      throw new ExceptionError(new TokenNotProvided())
    }
  }
}
