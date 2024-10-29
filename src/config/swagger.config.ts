import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
export function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Rummage-App')
    .setDescription(
      'API de Rummage-App para gestionar búsquedas y almacenamiento.',
    )
    .setVersion('1.0.0')
    .setContact(
      'Equipo Rummage',
      'https://www.rummage-app.com',
      'soporte@rummage-app.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')

  ;['http://localhost:3000', 'https://api.rummage-app.com'].forEach(
    (server) => {
      config.addServer(server)
    },
  )

  config
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'api_key')
    .addBasicAuth({ type: 'http', scheme: 'basic' }, 'basic')
    .addCookieAuth('sessionId', { type: 'apiKey', in: 'cookie' })
    .addSecurityRequirements('JWT')
    .setExternalDoc('Postman Collection', 'https://www.postman.com')
    .build()

  const document = SwaggerModule.createDocument(app, config.build())

  SwaggerModule.setup('api/v1/doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  })
}
