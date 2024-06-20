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
  ],
})
export class UserModule {}
