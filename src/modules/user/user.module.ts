import { Module } from '@nestjs/common'
import {
  UserByEmailController,
  UserCreateController,
  UserUpdateController,
} from './infrastructure/controllers'
import {
  UserCreateUsecase,
  UserByEmailUseCase,
  UserGetAllUseCase,
  UserDeleteUseCase,
  UserUpdateUseCase,
} from './application/usecase'
import {
  UserCreateService,
  UserByEmailService,
  UserGetAllService,
  UserDeleteService,
  UserUpdateService,
  UserValidationEmailService,
  UserValidationDeletedService,
  UserValidationNotEmailService,
  UserValidationIsPasswordService,
  UserValidationNotPasswordService,
} from './domain/services'
import {
  UserPrismaByEmailRepository,
  UserPrismaCreateRepository,
  UserPrismaDeleteRepository,
  UserPrismaGetAllRepository,
  UserPrismaUpdateRepository,
  UserValidateDeletePrismaRepository,
  UserValidateEmailPrismaRepository,
  UserValidateNotEmailPrismaRepository,
  UserValidateIsPasswordPrismaRepository,
  UserValidateNotPasswordPrismaRepository,
} from './infrastructure/repositories'
import { PrismaService } from '../prisma/prisma.service'
import { UserGetAllController } from './infrastructure/controllers/user-get-all.controller'
import { UserDeleteController } from './infrastructure/controllers/user-delete.controller'
@Module({
  imports: [],
  controllers: [
    UserCreateController,
    UserByEmailController,
    UserGetAllController,
    UserDeleteController,
    UserUpdateController,
  ],
  providers: [
    // application
    UserCreateUsecase,
    UserByEmailUseCase,
    UserGetAllUseCase,
    UserDeleteUseCase,
    UserUpdateUseCase,
    // domain
    UserCreateService,
    UserByEmailService,
    UserGetAllService,
    UserDeleteService,
    UserUpdateService,
    UserValidationEmailService,
    UserValidationDeletedService,
    UserValidationNotEmailService,
    UserValidationIsPasswordService,
    UserValidationNotPasswordService,
    // infrastructure
    UserPrismaCreateRepository,
    UserPrismaByEmailRepository,
    UserPrismaGetAllRepository,
    UserPrismaDeleteRepository,
    UserPrismaUpdateRepository,
    UserValidateDeletePrismaRepository,
    UserValidateEmailPrismaRepository,
    UserValidateNotEmailPrismaRepository,
    UserValidateIsPasswordPrismaRepository,
    UserValidateNotPasswordPrismaRepository,
    // other
    PrismaService,
  ],
  exports: [
    UserCreateUsecase,
    UserByEmailUseCase,
    UserGetAllUseCase,
    UserDeleteUseCase,
    UserUpdateUseCase,
    UserValidationEmailService,
    UserValidationDeletedService,
    UserValidationNotEmailService,
    UserValidationIsPasswordService,
    UserValidationNotPasswordService,
  ],
})
export class UserModule {}
