/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  Logger,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common'
import {
  ReqJwtVerifyTokenDto,
  TokenInvalid,
  TokenNotProvided,
} from '../../application/dtos'
import { JwtService } from '@nestjs/jwt'
import { ExceptionError } from '../../../../common/exceptions'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorators'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name)

  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // Primero, revisa si la ruta es pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      this.logger.log('Ruta pública, no se requiere verificación de token.')
      return true
    }

    // Si no es pública, procede con la extracción y verificación del token
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request as Request)

    if (!token) {
      this.logger.warn('Token no proporcionado.')
      throw new ExceptionError(new TokenNotProvided())
    }

    try {
      const reqJwtVerifyTokenDto = new ReqJwtVerifyTokenDto()
      reqJwtVerifyTokenDto.token = token

      const payload = await this.jwtService.verify(reqJwtVerifyTokenDto.token)
      request.user = payload
      this.logger.log('Token verificado con éxito.')
    } catch (error) {
      this.logger.error('Falló la verificación del token.', error)
      throw new ExceptionError(new TokenInvalid())
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string {
    const authHeader = request.headers.authorization
    const cookieHeader = request.headers.cookie
    let token: string | undefined

    if (authHeader) {
      const parts = authHeader.split(' ')
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1]
        this.logger.log('Token extraído del header Authorization.')
      } else {
        this.logger.warn(
          'El header Authorization está mal formado o el tipo de token no es Bearer.',
        )
        throw new ExceptionError(new TokenInvalid())
      }
    }

    if (!token && cookieHeader) {
      const cookieMatch = cookieHeader.match(/(?:^|;\s*)accessToken=([^;]*)/)
      token = cookieMatch ? cookieMatch[1] : undefined
      if (token) {
        this.logger.log('Token extraído del header Cookie.')
      }
    }

    if (!token) {
      this.logger.warn('No se encontró token en los headers o cookies.')
      throw new ExceptionError(new TokenNotProvided())
    }

    return token
  }
}
