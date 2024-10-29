import { NestFactory } from '@nestjs/core'
import { createValidationPipe } from './common/pipes'
import { configureApp, configureSwagger } from './config'
import { APP_CONSTANT } from './common/constant'
import { AppModule } from './modules'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  configureApp(app)
  configureSwagger(app)

  app.useGlobalPipes(createValidationPipe())

  await app.listen(APP_CONSTANT.PORT)
}

void bootstrap()
