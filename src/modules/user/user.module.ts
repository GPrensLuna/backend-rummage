import { Module } from '@nestjs/common'
import {
  UserByEmailController,
  UserCreateController,
} from './infrastructure/controllers'
import {
  UserCreateUsecase,
  UserByEmailUseCase,
  UserGetAllUseCase,
  UserDeleteUseCase,
} from './application/usecase'
import {
  UserCreateService,
  UserByEmailService,
  UserGetAllService,
  UserDeleteService,
  UserValidationEmailService,
  UserValidationDeletedService,
} from './domain/services'
import {
  UserPrismaByEmailRepository,
  UserPrismaCreateRepository,
  UserPrismaDeleteRepository,
  UserPrismaGetAllRepository,
  UserValidateDeletePrismaRepository,
  UserValidateEmailPrismaRepository,
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
  ],
  providers: [
    // application
    UserCreateUsecase,
    UserByEmailUseCase,
    UserGetAllUseCase,
    UserDeleteUseCase,
    //UserUpdateUseCase,
    // domain
    UserCreateService,
    UserByEmailService,
    UserGetAllService,
    UserDeleteService,
    UserValidationEmailService,
    UserValidationDeletedService,
    // infrastructure
    UserPrismaCreateRepository,
    UserPrismaByEmailRepository,
    UserPrismaGetAllRepository,
    UserPrismaDeleteRepository,
    UserValidateDeletePrismaRepository,
    UserValidateEmailPrismaRepository,
    // other
    PrismaService,
  ],
  exports: [],
})
export class UserModule {}
