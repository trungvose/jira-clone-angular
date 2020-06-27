import { IssuePriority, IssueType } from '@trungk18/interface/issue';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';

export class IssueUtil {
  static getIssueTypeIcon(issueType: IssueType): string {
    return issueType?.toLowerCase();
  }

  static getIssuePriorityIcon(issuePriority: IssuePriority): IssuePriorityIcon {
    return new IssuePriorityIcon(issuePriority);
  }

  static searchString(str: string, searchString: string): boolean {
    str = str ?? '';
    searchString = searchString ?? '';
    return str.trim().toLowerCase().includes(searchString.trim().toLowerCase());
  }
}
