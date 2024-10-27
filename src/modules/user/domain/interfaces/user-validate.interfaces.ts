import type {
  ReqUserValidateDto,
  ResUserValidateDto,
} from '../../application/dtos'

// * validation email
export interface InPutUserValidationEmailInterface {
  validationEmail: (reqUserValidate: ReqUserValidateDto) => Promise<void>
}

export interface OutPutUserValidationEmailInterface {
  validationEmail: (
    reqUserValidate: ReqUserValidateDto,
  ) => Promise<ResUserValidateDto>
}

// * validation is deleted
export interface InPutUserValidationIsDeletedInterface {
  validateDeleted: (reqUserValidate: ReqUserValidateDto) => Promise<void>
}

export interface OutPutUserValidationIsDeletedInterface {
  validateDeleted: (
    reqUserValidate: ReqUserValidateDto,
  ) => Promise<ResUserValidateDto>
}
