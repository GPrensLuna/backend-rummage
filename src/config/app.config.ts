import type { INestApplication } from '@nestjs/common'
import cookieParser from 'cookie-parser'
//import { APP_CONSTANT } from 'src/common/constant'

export const configureApp = (app: INestApplication): void => {
  app.enableCors({
    origin: [`${process.env['API_FRONTEND']}`, `${process.env['API_BACKEND']}`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  app.use(cookieParser())

  //app.setGlobalPrefix(APP_CONSTANT.API_VERSION)
}
