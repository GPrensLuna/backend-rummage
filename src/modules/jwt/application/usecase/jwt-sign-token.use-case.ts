import { Injectable, Logger } from '@nestjs/common'
import {
  SignatureError,
  type ReqJwtSignTokenDto,
  type ResJwtSignTokenDto,
} from '../dtos'
import { ExceptionError } from '../../../../common/exceptions'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtSignTokenUseCase {
  private readonly logger = new Logger(JwtSignTokenUseCase.name)

  public constructor(private readonly jwtService: JwtService) {}

  public signToken(reqJwtSignTokenDto: ReqJwtSignTokenDto): ResJwtSignTokenDto {
    try {
      this.logger.log('Signing token', reqJwtSignTokenDto)
      const token = this.jwtService.sign(reqJwtSignTokenDto.payload)

      return { accessToken: token }
    } catch {
      this.logger.error('Error signing token')
      throw new ExceptionError(new SignatureError())
    }
  }
}
