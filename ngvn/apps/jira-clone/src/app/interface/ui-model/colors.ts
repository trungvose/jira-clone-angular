import { ProjectIssueStatus, ProjectIssuePriority } from '@trungk18/core/graphql/service/graphql';

export const IssueStatusDisplay = {
  [ProjectIssueStatus.Backlog]: 'Backlog',
  [ProjectIssueStatus.Selected]: 'Selected for Development',
  [ProjectIssueStatus.InProgress]: 'In progress',
  [ProjectIssueStatus.Done]: 'Done'
};

export const IssuePriorityColors = {
  [ProjectIssuePriority.Highest]: '#CD1317',
  [ProjectIssuePriority.High]: '#E9494A',
  [ProjectIssuePriority.Medium]: '#E97F33',
  [ProjectIssuePriority.Low]: '#2D8738',
  [ProjectIssuePriority.Lowest]: '#57A55A'
};
