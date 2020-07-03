import { registerEnumType } from '@nestjs/graphql';

export enum ProjectCategory {
  Software = 'Software',
}

registerEnumType(ProjectCategory, { name: 'ProjectCategory' });
