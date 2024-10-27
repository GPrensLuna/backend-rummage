import { ValidationPipe } from '@nestjs/common'

export const createValidationPipe = (): ValidationPipe => {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
}
