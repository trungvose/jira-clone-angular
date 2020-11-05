import { IssuePriority, IssueType } from '../issue';

export interface AddIssueDTO {
  title: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  reporterId: string;
  userIds: string[];
}
