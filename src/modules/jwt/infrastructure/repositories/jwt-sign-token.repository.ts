import { Injectable } from '@nestjs/common'
import {
  SignatureError,
  type ReqJwtSignTokenDto,
  type ResJwtSignTokenDto,
} from '../../application/dtos'
import type { JwtSignTokenRepositoryInterfaces } from '../../domain/interfaces'
import { JwtService } from '@nestjs/jwt'
import { ExceptionError } from '../../../../common/exceptions'

@Injectable()
export class JwtSignTokenRepository
  implements JwtSignTokenRepositoryInterfaces
{
  public constructor(private readonly jwtService: JwtService) {}

  public signToken(reqJwtSignTokenDto: ReqJwtSignTokenDto): ResJwtSignTokenDto {
    try {
      const payload = {
        sub: reqJwtSignTokenDto.id,
        email: reqJwtSignTokenDto.payload.email,
      }

      const token = this.jwtService.sign(payload)

      return { accessToken: token }
    } catch {
      throw new ExceptionError(new SignatureError())
    }
  }
}
