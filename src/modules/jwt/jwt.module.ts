import { Global, Module } from '@nestjs/common'
import { JwtSignTokenController } from './infrastructure/controllers'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './infrastructure/costanas'
import { JwtAuthGuard } from './infrastructure/guards'
import { JwtSignTokenService } from './domain/services'
import { JwtSignTokenUseCase } from './application/usecase'
import { JwtSignTokenRepository } from './infrastructure/repositories'

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
  controllers: [JwtSignTokenController],
  providers: [
    JwtSignTokenUseCase,
    JwtSignTokenService,
    JwtSignTokenRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    Reflector,
  ],
  exports: [JwtSignTokenService],
})
export class JwtAccesoModule {}
