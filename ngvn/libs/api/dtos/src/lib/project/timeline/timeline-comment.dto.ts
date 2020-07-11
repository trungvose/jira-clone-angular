import { Field, ObjectType } from '@nestjs/graphql';
import { AutoMap } from 'nestjsx-automapper';
import { TimelineDto } from './timeline.dto';

@ObjectType()
export class TimelineCommentDto extends TimelineDto {
  @Field()
  @AutoMap()
  outputHtml: string;
}
