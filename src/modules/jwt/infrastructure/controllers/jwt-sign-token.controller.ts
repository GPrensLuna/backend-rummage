import { Controller, Post, Body } from '@nestjs/common'
import {
  type ReqJwtSignTokenDto,
  type ResJwtSignTokenDto,
  TokenNotProvided,
} from '../../application/dtos'
import { ExceptionError } from '../../../../common/exceptions'
import { JwtSignTokenUseCase } from '../../application/usecase'

@Controller('auth')
export class JwtSignTokenController {
  public constructor(
    private readonly jwtSignTokenUseCase: JwtSignTokenUseCase,
  ) {}

  @Post('signIn')
  public signIn(
    @Body() reqJwtSignTokenDto: ReqJwtSignTokenDto,
  ): ResJwtSignTokenDto {
    try {
      const token = this.jwtSignTokenUseCase.signToken(reqJwtSignTokenDto)
      return token
    } catch (error) {
      if (error instanceof ExceptionError) {
        throw error
      }
      throw new ExceptionError(new TokenNotProvided())
    }
  }
}
