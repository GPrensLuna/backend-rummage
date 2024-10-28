import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  SignatureError,
  type ReqJwtSignTokenDto,
  type ResJwtSignTokenDto,
} from '../dtos'
import { ExceptionError } from '../../../../common/exceptions'
import { JwtSignTokenService } from '../../domain/services'

@Injectable()
export class JwtSignTokenUseCase {
  private readonly logger = new Logger(JwtSignTokenUseCase.name)

  public constructor(
    @Inject(JwtSignTokenService)
    private readonly jwtSignTokenService: JwtSignTokenService,
  ) {}

  public signToken(reqJwtSignTokenDto: ReqJwtSignTokenDto): ResJwtSignTokenDto {
    try {
      this.logger.debug('Signing token', reqJwtSignTokenDto)

      return this.jwtSignTokenService.signToken(reqJwtSignTokenDto)
    } catch (error) {
      this.logger.error('Error signing token', error)
      throw new ExceptionError(new SignatureError())
    }
  }
}
