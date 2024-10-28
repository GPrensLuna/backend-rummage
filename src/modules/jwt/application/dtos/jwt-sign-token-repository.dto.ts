import type { UserEntity } from '../../domain/entities'

export class ReqJwtSignTokenDto {
  public payload: Pick<UserEntity, 'id' | 'email' | 'name'>

  public constructor(id: string, email: string, name: string) {
    this.payload = { id, email, name }
  }
}

export class ResJwtSignTokenDto {
  public accessToken = ''
}
