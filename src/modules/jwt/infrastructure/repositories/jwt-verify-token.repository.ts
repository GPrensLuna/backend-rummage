import { Injectable } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import {
  SignatureError,
  TokenExpired,
  TokenInvalid,
  TokenNotProvided,
  type ReqJwtVerifyTokenDto,
  type ResJwtSignTokenDto,
} from '../../application/dtos'
import { jwtConstants } from '../costanas'
import type { JwtVerifyTokenRepositoryInterfaces } from '../../domain/interfaces'
import { ExceptionError } from '../../../../common/exceptions'

@Injectable()
export class JwtVerifyTokenRepository
  implements JwtVerifyTokenRepositoryInterfaces
{
  public async verifyToken(
    reqJwtVerifyTokenDto: ReqJwtVerifyTokenDto,
  ): Promise<ResJwtSignTokenDto> {
    const { token } = reqJwtVerifyTokenDto

    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConstants.secret, (err) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return reject(new ExceptionError(new TokenExpired()))
          } else if (err.name === 'JsonWebTokenError') {
            return reject(new ExceptionError(new TokenInvalid()))
          } else if (err.name === 'NotBeforeError') {
            return reject(new ExceptionError(new TokenNotProvided()))
          } else {
            return reject(new ExceptionError(new SignatureError()))
          }
        }

        resolve({ accessToken: token })
      })
    })
  }
}
