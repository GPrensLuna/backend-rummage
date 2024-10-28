import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  type ReqJwtVerifyTokenDto,
  type ResJwtSignTokenDto,
  TokenNotProvided,
} from '../dtos'
import { ExceptionError } from '../../../../common/exceptions'
import { JwtVerifyTokenService } from '../../domain/services'

@Injectable()
export class JwtVerifyTokenUseCase {
  private readonly logger = new Logger(JwtVerifyTokenUseCase.name)

  public constructor(
    @Inject(JwtVerifyTokenService)
    private readonly jwtVerifyTokenService: JwtVerifyTokenService,
  ) {}

  public async verifyToken(
    reqJwtVerifyTokenDto: ReqJwtVerifyTokenDto,
  ): Promise<ResJwtSignTokenDto> {
    try {
      this.logger.debug('Verifying token', reqJwtVerifyTokenDto.token)
      return await this.jwtVerifyTokenService.verifyToken(reqJwtVerifyTokenDto)
    } catch (error) {
      this.logger.error('Error verifying token', error)
      throw new ExceptionError(new TokenNotProvided())
    }
  }
}
