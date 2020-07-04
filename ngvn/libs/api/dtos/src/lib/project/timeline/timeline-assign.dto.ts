import { Field, ObjectType } from '@nestjs/graphql';
import { AutoMap } from 'nestjsx-automapper';
import { UserDto } from '../../user';
import { TimelineDto } from './timeline.dto';

@ObjectType()
export class TimelineAssignDto extends TimelineDto {
  @Field((returns) => [UserDto])
  @AutoMap(() => UserDto)
  assignees: UserDto[];
}
