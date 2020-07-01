import { registerEnumType } from '@nestjs/graphql';

export enum PermissionType {
  System = 'System',
  Team = 'Team',
  Project = 'Project',
}

registerEnumType(PermissionType, { name: 'PermissionType' });
