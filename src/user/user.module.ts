import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { TypeORMUserRepository } from './infrastructure/repository/TypeOrmUserRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [UserController],
  providers: [
    { provide: 'UserRepository', useClass: TypeORMUserRepository },
    {
      provide: 'CreateUser',
      useFactory: (repository: UserRepository) => new CreateUser(repository),
      inject: ['UserRepository'],
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
      useFactory: (repository: UserRepository) =>
        new EditUserPassword(repository),
      inject: ['UserRepository'],
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
