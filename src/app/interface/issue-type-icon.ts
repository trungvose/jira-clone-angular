import { IssueType } from './issue';
import { IssueUtil } from '@trungk18/project/utils/issue';

export class IssueTypeWithIcon {
  value: IssueType;
  icon: string;

  constructor(issueType: IssueType) {
    this.value = issueType;
    this.icon = IssueUtil.getIssueTypeIcon(issueType);
  }
}
