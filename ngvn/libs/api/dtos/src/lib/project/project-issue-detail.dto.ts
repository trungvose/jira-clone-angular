import { Field, ObjectType } from '@nestjs/graphql';
import { AutoMap } from 'nestjsx-automapper';
import { UserDto } from '../user';
import { ProjectIssueDto } from './project-issue.dto';
import { TimelineDto, TimelineUnionDto } from './timeline';

@ObjectType()
export class ProjectIssueDetailDto extends ProjectIssueDto {
  @Field()
  @AutoMap()
  bodyMarkdown: string;
  @Field()
  @AutoMap()
  outputHtml: string;
  @Field((returns) => [TimelineUnionDto], { nullable: 'items' })
  @AutoMap(() => TimelineDto)
  timelines: Array<typeof TimelineUnionDto>;
  @Field((returns) => UserDto)
  @AutoMap(() => UserDto)
  reporter: UserDto;
  @Field((returns) => UserDto, { nullable: true })
  @AutoMap(() => UserDto)
  assignee: UserDto;
  @Field((returns) => [UserDto], { nullable: 'items' })
  @AutoMap(() => UserDto)
  participants: UserDto[];
}
