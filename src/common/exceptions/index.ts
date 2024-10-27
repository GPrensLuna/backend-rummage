import { HttpException } from '@nestjs/common'

interface ErrorCustomInterface {
  errorCode: number
  message: string
  timestamp?: string
}

class CustomExceptionError extends HttpException {
  public constructor(response: ErrorCustomInterface, status: number) {
    super(response, status)
  }
}

export class ExceptionError extends CustomExceptionError {
  public constructor(error: ErrorCustomInterface) {
    const response: ErrorCustomInterface = {
      ...error,
      timestamp: new Date().toISOString(),
    }
    super(response, error.errorCode)
  }
}
