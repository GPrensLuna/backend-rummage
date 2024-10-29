import { Controller, Get, Logger, Request } from '@nestjs/common'
import {
  AuthRequest,
  ResUserDataDto,
  UserDataDto,
} from '../../application/dtos'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthProfileController {
  private readonly logger = new Logger(AuthProfileController.name)

  @Get('profile')
  public getProfile(@Request() req: AuthRequest): ResUserDataDto {
    const session: UserDataDto = req.user

    this.logger.log(JSON.stringify(session))

    return new ResUserDataDto(session)
  }
}
