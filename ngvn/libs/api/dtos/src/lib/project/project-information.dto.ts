import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { ProjectCategory } from '@ngvn/shared/project';
import { AutoMap } from 'nestjsx-automapper';
import { TeamDto } from '../team';
import { UserDto } from '../user';

@ObjectType()
export class ProjectInformationDto extends BaseDto {
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
  @Field((returns) => UserDto)
  @AutoMap(() => UserDto)
  owner: UserDto;
  @Field((returns) => [UserDto])
  @AutoMap(() => UserDto)
  users: UserDto[];
  @Field((returns) => [TeamDto])
  @AutoMap(() => TeamDto)
  teams: TeamDto[];
}
