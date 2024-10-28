import type { JwtEntity } from '../../domain/entities'

export class ReqJwtSignTokenDto {
  public payload: Pick<JwtEntity, 'email' | 'id'>
  public id: string

  public constructor(email: string, id: string) {
    this.payload = { email: email, id: id }
    this.id = id
  }
}

export class ResJwtSignTokenDto {
  public accessToken = ''
}
