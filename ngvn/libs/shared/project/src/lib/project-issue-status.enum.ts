import { registerEnumType } from '@nestjs/graphql';

export enum ProjectIssueStatus {
  Backlog = 'Backlog',
  Selected = 'Selected',
  InProgress = 'InProgress',
  Done = 'Done',
}

registerEnumType(ProjectIssueStatus, { name: 'ProjectIssueStatus' });
