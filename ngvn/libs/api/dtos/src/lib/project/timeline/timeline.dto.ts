import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { ProjectTimelineType } from '@ngvn/shared/project';
import { AutoMap } from 'nestjsx-automapper';
import { UserDto } from '../../user';

@ObjectType({
  isAbstract: true,
})
export class TimelineDto extends BaseDto {
  @Field((returns) => ProjectTimelineType)
  @AutoMap()
  type: ProjectTimelineType;
  @Field((returns) => UserDto)
  @AutoMap(() => UserDto)
  actor: UserDto;
}
