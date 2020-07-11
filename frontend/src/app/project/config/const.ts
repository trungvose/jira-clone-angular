import { ProjectIssuePriority, ProjectIssueType } from '@trungk18/core/graphql/service/graphql';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';
import { IssueTypeWithIcon } from '@trungk18/interface/issue-type-icon';
import { IssueUtil } from '../utils/issue';

export class ProjectConst {
  static readonly IssueId = 'issueId';
  static readonly Projects = 'Projects';
  static PrioritiesWithIcon: IssuePriorityIcon[] = [
    IssueUtil.getIssuePriorityIcon(ProjectIssuePriority.Lowest),
    IssueUtil.getIssuePriorityIcon(ProjectIssuePriority.Low),
    IssueUtil.getIssuePriorityIcon(ProjectIssuePriority.Medium),
    IssueUtil.getIssuePriorityIcon(ProjectIssuePriority.High),
    IssueUtil.getIssuePriorityIcon(ProjectIssuePriority.Highest)
  ];

  static IssueTypesWithIcon: IssueTypeWithIcon[] = [
    new IssueTypeWithIcon(ProjectIssueType.Bug),
    new IssueTypeWithIcon(ProjectIssueType.Story),
    new IssueTypeWithIcon(ProjectIssueType.Task)
  ];
}
