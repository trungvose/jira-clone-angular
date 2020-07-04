import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { ProjectCategory } from '@ngvn/shared/project';
import { AutoMap } from 'nestjsx-automapper';
import { TeamDto } from '../team';
import { UserDto } from '../user';
import { ProjectIssueDto } from './project-issue.dto';
import { ProjectLaneDto } from './project-lane.dto';

@ObjectType()
export class ProjectDto extends BaseDto {
  @Field()
  @AutoMap()
  name: string;
  @Field()
  @AutoMap()
  slug: string;
  @Field({ nullable: true })
  @AutoMap()
  description?: string;
  @Field((returns) => ProjectCategory)
  @AutoMap()
  category: ProjectCategory;
  @Field((returns) => [UserDto])
  @AutoMap(() => UserDto)
  users: UserDto[];
  @Field((returns) => [TeamDto])
  @AutoMap(() => TeamDto)
  teams: TeamDto[];
  @Field((returns) => [ProjectLaneDto], { nullable: 'items' })
  @AutoMap(() => ProjectLaneDto)
  lanes: ProjectLaneDto[];
}
