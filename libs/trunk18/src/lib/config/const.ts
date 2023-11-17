import { IssuePriorityIcon } from '../builders/issue-priority-icon';
import { IssuePriority, IssueType } from '@trunk18/interface';
import { IssueUtil } from '../utils/issue';
import { IssueTypeWithIcon } from '../builders/issue-type-icon';

export class ProjectConst {
  /* eslint-disable @typescript-eslint/naming-convention */
  static readonly IssueId = 'issueId';
  static readonly Projects = 'Projects';
  static PrioritiesWithIcon: IssuePriorityIcon[] = [
    IssueUtil.getIssuePriorityIcon(IssuePriority.LOWEST),
    IssueUtil.getIssuePriorityIcon(IssuePriority.LOW),
    IssueUtil.getIssuePriorityIcon(IssuePriority.MEDIUM),
    IssueUtil.getIssuePriorityIcon(IssuePriority.HIGH),
    IssueUtil.getIssuePriorityIcon(IssuePriority.HIGHEST),
  ];

  static IssueTypesWithIcon: IssueTypeWithIcon[] = [
    new IssueTypeWithIcon(IssueType.BUG),
    new IssueTypeWithIcon(IssueType.STORY),
    new IssueTypeWithIcon(IssueType.TASK),
  ];
  /* eslint-enable @typescript-eslint/naming-convention */
}
