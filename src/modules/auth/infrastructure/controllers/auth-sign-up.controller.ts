import {
  Controller,
  Post,
  Body,
  Logger,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'

import { Public } from '../../../jwt/infrastructure/decorators'
import { ReqUserCreateDto, ResUserCreateDto } from '../../application/dtos'
import { UserCreateUsecase } from 'src/modules/user/application/usecase'

@Controller('auth')
export class AuthSignUpController {
  private readonly logger = new Logger(AuthSignUpController.name)

  public constructor(private readonly userCreateUsecase: UserCreateUsecase) {}

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @Body() reqAuthSignUpDto: ReqUserCreateDto,
  ): Promise<ResUserCreateDto> {
    this.logger.debug('SignUp : Entrada', reqAuthSignUpDto)
    return this.userCreateUsecase.createUser(reqAuthSignUpDto)
  }
}
