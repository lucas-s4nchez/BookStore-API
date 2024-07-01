import { User } from '../../../user/domain/entities';

export interface IUserAndToken {
  user: User;
  access_token: string;
}
