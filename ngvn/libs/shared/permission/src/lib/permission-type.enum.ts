import { registerEnumType } from '@nestjs/graphql';

export enum PermissionType {
  System = 'System',
  Team = 'Team',
  Project = 'Project',
  ProjectIssue = 'ProjectIssue',
}

registerEnumType(PermissionType, { name: 'PermissionType' });
