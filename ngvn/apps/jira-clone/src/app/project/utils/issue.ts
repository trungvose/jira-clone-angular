import { ProjectIssuePriority, ProjectIssueType } from '@trungk18/core/graphql/service/graphql';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';

export class IssueUtil {
  static getIssueTypeIcon(issueType: ProjectIssueType): string {
    return issueType?.toLowerCase();
  }

  static getIssuePriorityIcon(issuePriority: ProjectIssuePriority): IssuePriorityIcon {
    return new IssuePriorityIcon(issuePriority);
  }

  static getRandomId(): string {
    return `${Math.ceil(Math.random() * 8000)}`;
  }

  static searchString(str: string, searchString: string): boolean {
    str = str ?? '';
    searchString = searchString ?? '';
    return str.trim().toLowerCase().includes(searchString.trim().toLowerCase());
  }
}
