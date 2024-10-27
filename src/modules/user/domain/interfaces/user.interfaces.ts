import type {
  ReqUserByEmailDto,
  ResUserByEmailDto,
  ReqUserCreateDto,
  ResUserCreateDto,
  ReqUserDeleteDto,
  ResUserDeleteDto,
  ResUserGetAllDto,
  ReqUserUpdateDto,
  ResUserUpdateDto,
} from '../../application/dtos'

// * create user
export interface InPutUserCreateInterface {
  createUser: (reqUserCreate: ReqUserCreateDto) => Promise<ResUserCreateDto>
}

export interface OutPutUserCreateInterface {
  createUser: (reqUserCreate: ReqUserCreateDto) => Promise<ResUserCreateDto>
}

// * get user by email
export interface InPutUserByEmailInterface {
  getUserByEmail: (
    reqUserCreate: ReqUserByEmailDto,
  ) => Promise<ResUserByEmailDto>
}

export interface OutPutUserByEmailInterface {
  getUserByEmail: (
    reqUserCreate: ReqUserByEmailDto,
  ) => Promise<ResUserByEmailDto>
}

// * get user all

export interface InPutUserGetAllInterface {
  getUserAll: () => Promise<ResUserGetAllDto>
}

export interface OutPutUserGetAllInterface {
  getUserAll: () => Promise<ResUserGetAllDto>
}

// * delete user
export interface InPutUserDeleteInterface {
  deleteUser: (reqUserDelete: ReqUserDeleteDto) => Promise<ResUserDeleteDto>
}

export interface OutPutUserDeleteInterface {
  deleteUser: (reqUserDelete: ReqUserDeleteDto) => Promise<ResUserDeleteDto>
}

// * update user

export interface InPutUserUpdateInterface {
  updateUser: (reqUserUpdate: ReqUserUpdateDto) => Promise<ResUserUpdateDto>
}

export interface OutPutUserUpdateInterface {
  updateUser: (reqUserUpdate: ReqUserUpdateDto) => Promise<ResUserUpdateDto>
}
