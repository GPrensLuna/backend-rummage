import type {
  ReqJwtVerifyTokenDto,
  ResJwtSignTokenDto,
} from '../../application/dtos'

export interface JwtVerifyTokenRepositoryInterfaces {
  verifyToken: (
    reqJwtVerifyTokenDto: ReqJwtVerifyTokenDto,
  ) => Promise<ResJwtSignTokenDto>
}
