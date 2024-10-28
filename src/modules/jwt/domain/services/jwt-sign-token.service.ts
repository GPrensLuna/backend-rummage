import { Inject, Injectable, Logger } from '@nestjs/common'

import { ExceptionError } from '../../../../common/exceptions'
import {
  type ReqJwtSignTokenDto,
  type ResJwtSignTokenDto,
  SignatureError,
} from '../../application/dtos'
import { JwtSignTokenRepository } from '../../infrastructure/repositories'

@Injectable()
export class JwtSignTokenService {
  private readonly logger = new Logger(JwtSignTokenService.name)
  public constructor(
    @Inject(JwtSignTokenRepository)
    private readonly jwtSignTokenRepository: JwtSignTokenRepository,
  ) {}

  public signToken(reqJwtSignTokenDto: ReqJwtSignTokenDto): ResJwtSignTokenDto {
    try {
      this.logger.log('Signing token', reqJwtSignTokenDto)

      return this.jwtSignTokenRepository.signToken(reqJwtSignTokenDto)
    } catch (error) {
      this.logger.error('Error signing token', error)
      throw new ExceptionError(new SignatureError())
    }
  }
}
