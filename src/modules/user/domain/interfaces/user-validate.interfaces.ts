import type {
  ReqUserPasswordValidateDto,
  ReqUserValidateDto,
  ResUserValidateDto,
} from '../../application/dtos'

// * validation email existe
export interface OutPutUserValidationEmailInterface {
  validationEmail: (
    reqUserValidate: ReqUserValidateDto,
  ) => Promise<ResUserValidateDto>
}

// * validation not email existe
export interface OutPutUserValidationNotEmailInterface {
  validateNotEmail: (
    reqUserValidate: ReqUserValidateDto,
  ) => Promise<ResUserValidateDto>
}

// * validation is deleted
export interface OutPutUserValidationIsDeletedInterface {
  validateDeleted: (
    reqUserValidate: ReqUserValidateDto,
  ) => Promise<ResUserValidateDto>
}

// * validation is password
export interface OutPutUserValidationIsPasswordInterface {
  validatePassword: (
    reqUserValidate: ReqUserPasswordValidateDto,
  ) => Promise<ResUserValidateDto>
}
