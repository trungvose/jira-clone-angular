import { registerEnumType } from '@nestjs/graphql';

export enum ProjectIssuePriority {
  Lowest = 'Lowest',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Highest = 'Highest',
}

registerEnumType(ProjectIssuePriority, { name: 'ProjectIssuePriority' });
