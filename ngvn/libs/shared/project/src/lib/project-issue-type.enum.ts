import { registerEnumType } from '@nestjs/graphql';

export enum ProjectIssueType {
  Task = 'Task',
  Story = 'Story',
  Bug = 'Bug',
}

registerEnumType(ProjectIssueType, { name: 'ProjectIssueType' });
