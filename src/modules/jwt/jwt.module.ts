import { Global, Module } from '@nestjs/common'
import {
  JwtSignTokenController,
  JwtVerifyTokenController,
} from './infrastructure/controllers'
import { Reflector } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './infrastructure/costanas'
import { JwtAuthGuard } from './infrastructure/guards'
import { JwtSignTokenService, JwtVerifyTokenService } from './domain/services'
import {
  JwtSignTokenUseCase,
  JwtVerifyTokenUseCase,
} from './application/usecase'
import {
  JwtSignTokenRepository,
  JwtVerifyTokenRepository,
} from './infrastructure/repositories'

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [JwtSignTokenController, JwtVerifyTokenController],
  providers: [
    JwtSignTokenUseCase,
    JwtVerifyTokenUseCase,
    JwtAuthGuard,
    JwtSignTokenService,
    JwtVerifyTokenService,
    JwtSignTokenRepository,
    JwtVerifyTokenRepository,
    JwtAuthGuard,
    /*     {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, */
    Reflector,
  ],
  exports: [JwtSignTokenService, JwtVerifyTokenService, JwtVerifyTokenUseCase],
})
export class JwtAccesoModule {}
