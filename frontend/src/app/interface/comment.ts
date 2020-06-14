import { User } from './user';

export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issueId: string;
  userId: string;
  user: User;
}
