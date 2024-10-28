import type {
  ReqJwtSignTokenDto,
  ResJwtSignTokenDto,
} from '../../application/dtos'

export interface JwtSignTokenRepositoryInterfaces {
  signToken: (reqJwtSignTokenDto: ReqJwtSignTokenDto) => ResJwtSignTokenDto
}
