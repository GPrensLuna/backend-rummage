import { Inject, Injectable, Logger } from '@nestjs/common'

import {
  TokenNotProvided,
  type ReqJwtVerifyTokenDto,
  type ResJwtSignTokenDto,
} from '../../application/dtos'
import { ExceptionError } from '../../../../common/exceptions'
import { JwtVerifyTokenRepository } from '../../infrastructure/repositories'

@Injectable()
export class JwtVerifyTokenService {
  private readonly logger = new Logger(JwtVerifyTokenService.name)
  public constructor(
    @Inject(JwtVerifyTokenRepository)
    private readonly jwtVerifyTokenRepository: JwtVerifyTokenRepository,
  ) {}

  public async verifyToken(
    reqJwtVerifyTokenDto: ReqJwtVerifyTokenDto,
  ): Promise<ResJwtSignTokenDto> {
    try {
      this.logger.debug('Verifying token', reqJwtVerifyTokenDto.token)
      return await this.jwtVerifyTokenRepository.verifyToken(
        reqJwtVerifyTokenDto,
      )
    } catch (error) {
      this.logger.error('Error verifying token', error)
      throw new ExceptionError(new TokenNotProvided())
    }
  }
}
