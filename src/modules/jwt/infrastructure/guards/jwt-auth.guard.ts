/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  Injectable,
  Logger,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common'
import { JwtVerifyTokenUseCase } from '../../application/usecase'
import {
  ReqJwtVerifyTokenDto,
  TokenInvalid,
  TokenNotProvided,
} from '../../application/dtos'
import { ExceptionError } from '../../../../common/exceptions'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorators'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name)

  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtVerifyTokenService: JwtVerifyTokenUseCase,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request as Request)

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      this.logger.log('Public route, no token verification needed.')
      return true
    }

    if (!token) {
      this.logger.warn('Token not provided.')
      throw new ExceptionError(new TokenNotProvided())
    }

    try {
      const reqJwtVerifyTokenDto = new ReqJwtVerifyTokenDto()
      reqJwtVerifyTokenDto.token = token

      const payload =
        await this.jwtVerifyTokenService.verifyToken(reqJwtVerifyTokenDto)
      request.user = payload
      this.logger.log('Token verified successfully.')
    } catch (error) {
      this.logger.error('Token verification failed.', error)
      throw new ExceptionError(new TokenInvalid())
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader: string | null = request.headers.get('authorization')

    if (!authHeader) {
      this.logger.warn('Authorization header is missing.')
      return undefined
    }

    const parts: string[] = authHeader.split(' ')

    if (parts.length !== 2) {
      this.logger.warn('Authorization header is malformed.')
      return undefined
    }

    const [type, token] = parts

    if (type === 'Bearer' && typeof token === 'string' && token.length > 0) {
      this.logger.log('Token extracted from header.')
      return token
    }

    this.logger.warn('Token type is not Bearer or token is invalid.')
    return undefined
  }
}
