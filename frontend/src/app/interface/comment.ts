import { UserDto } from '@trungk18/core/graphql/service/graphql';

export class JComment {
  constructor(issueId: string, user: UserDto) {
    let now = new Date();
    this.id = `${now.getTime()}`;
    this.issueId = issueId;
    this.user = user;
    this.createdAt = now.toISOString();
    this.updatedAt = now.toISOString();
  }

  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issueId: string;
  userId: string;
  //mapped to display by userId
  user: UserDto;
}
