import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';

@ObjectType()
export class ProjectIssueTagStyle {
  @Field()
  @AutoMap()
  color: string;
  @Field()
  @AutoMap()
  backgroundColor: string;
}

@ObjectType()
export class ProjectIssueTagDto extends BaseDto {
  @Field()
  @AutoMap()
  text: string;
  @Field((returns) => ProjectIssueTagStyle)
  styles: ProjectIssueTagStyle;
  @Field({ nullable: true })
  @AutoMap()
  description?: string;
}
