import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectIssueType } from '@trungk18/core/graphql/service/graphql';

export class IssueTypeWithIcon {
  value: string;
  icon: string;

  constructor(issueType: ProjectIssueType) {
    this.value = issueType;
    this.icon = IssueUtil.getIssueTypeIcon(issueType);
  }
}
