import { Controller, Get, Logger } from '@nestjs/common'
import { ResUserGetAllDto } from '../../application/dtos'
import { UserGetAllUseCase } from '../../application/usecase'

@Controller('user')
export class UserGetAllController {
  private readonly logger = new Logger(UserGetAllController.name)
  public constructor(private readonly userGetAllUseCase: UserGetAllUseCase) {}
  @Get()
  public async getAllUser(): Promise<ResUserGetAllDto> {
    this.logger.log('Get all user')
    return this.userGetAllUseCase.getAllUser()
  }
}
