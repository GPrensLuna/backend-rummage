import type { UserEntity } from 'src/modules/user/domain/entities'

declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization?: string
        cookie?: string
      }
      user?: Partial<UserEntity>
    }
  }
}

export {}
