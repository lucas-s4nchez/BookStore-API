import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/domain/repository';
import { AuthController } from './infraestructure/controllers';
import {
  BcriptHashPasswordService,
  JwtAuthService,
} from './infraestructure/services';
import { RefreshToken, SignIn, SignUp } from './application/use-cases';
import { AuthService, HashPasswordService } from './application/services';
import { JwtStrategy } from './infraestructure/strategies';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: 'CLAVE_SECRETA',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'AuthService',
      useClass: JwtAuthService,
    },
    {
      provide: 'HashPasswordService',
      useClass: BcriptHashPasswordService,
    },
    {
      provide: 'SignIn',
      useFactory: (
        repository: UserRepository,
        authService: AuthService,
        hashPasswordService: HashPasswordService,
      ) => {
        return new SignIn(repository, authService, hashPasswordService);
      },
      inject: ['UserRepository', 'AuthService', 'HashPasswordService'],
    },
    {
      provide: 'SignUp',
      useFactory: (
        repository: UserRepository,
        authService: AuthService,
        hashPasswordService: HashPasswordService,
      ) => {
        return new SignUp(repository, authService, hashPasswordService);
      },
      inject: ['UserRepository', 'AuthService', 'HashPasswordService'],
    },
    {
      provide: 'RefreshToken',
      useFactory: (authService: AuthService) => {
        return new RefreshToken(authService);
      },
      inject: ['AuthService'],
    },
  ],
  exports: ['AuthService', 'HashPasswordService'],
})
export class AuthModule {}
