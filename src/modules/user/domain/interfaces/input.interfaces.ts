import type { UserEntity } from '../entities/user.entity'

export class RequestUserCreateDto
  implements Pick<UserEntity, 'name' | 'email' | 'password'>
{
  public readonly name: string = ''
  public readonly email: string = ''
  public readonly password: string = ''
}

export interface InPutUserCreateInterface {
  createUser: (reqUserCreate: RequestUserCreateDto) => Promise<UserEntity>
}
