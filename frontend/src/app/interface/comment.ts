import { JUser } from './user';

export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issueId: string;
  userId: string;
  //mapped to display by userId
  user: JUser;
}
