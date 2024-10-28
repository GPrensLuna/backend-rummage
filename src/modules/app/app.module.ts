import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { PrismaService } from '../prisma/prisma.service'
import { AuthModule } from '../auth/auth.module'
import { JwtAccesoModule } from '../jwt/jwt.module'

@Module({
  imports: [UserModule, AuthModule, JwtAccesoModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
