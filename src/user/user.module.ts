import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { HashPasswordService } from '../auth/application/services';
import { TypeORMUserRepository } from './infrastructure/repository/TypeOrmUserRepository';
import { TypeOrmUser } from './infrastructure/entities/TypeOrmUser.entity';
import { UserRepository } from './domain/repository';
import {
  FindAllUsers,
  CreateUser,
  FindUserById,
  EditUserEmail,
  EditUserPassword,
  EditUserName,
  DeleteUser,
} from './application/use-cases';
import {
  AdminUserManagementController,
  UserProfileController,
} from './infrastructure/controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmUser]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserProfileController, AdminUserManagementController],
  providers: [
    { provide: 'UserRepository', useClass: TypeORMUserRepository },
    {
      provide: 'CreateUser',
      useFactory: (
        repository: UserRepository,
        hashPasswordService: HashPasswordService,
      ) => new CreateUser(repository, hashPasswordService),
      inject: ['UserRepository', 'HashPasswordService'],
    },
    {
      provide: 'FindAllUsers',
      useFactory: (repository: UserRepository) => new FindAllUsers(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'FindUserById',
      useFactory: (repository: UserRepository) => new FindUserById(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'EditUserEmail',
      useFactory: (repository: UserRepository) => new EditUserEmail(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'EditUserPassword',
      useFactory: (
        repository: UserRepository,
        hashPasswordService: HashPasswordService,
      ) => new EditUserPassword(repository, hashPasswordService),
      inject: ['UserRepository', 'HashPasswordService'],
    },
    {
      provide: 'EditUserName',
      useFactory: (repository: UserRepository) => new EditUserName(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'DeleteUser',
      useFactory: (repository: UserRepository) => new DeleteUser(repository),
      inject: ['UserRepository'],
    },
  ],
  exports: ['UserRepository'],
})
export class UserModule {}
