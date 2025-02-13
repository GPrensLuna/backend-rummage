import { Module } from '@nestjs/common'
import {
  AuthProfileController,
  AuthSignInController,
  AuthSignUpController,
} from './infrastructure/controllers'

import { UserModule } from '../user/user.module'
import { AuthSignInUseCase } from './application/usecase'

@Module({
  imports: [UserModule],
  controllers: [
    AuthSignInController,
    AuthSignUpController,
    AuthProfileController,
  ],
  providers: [AuthSignInUseCase],
  exports: [AuthSignInUseCase],
})
export class AuthModule {}
