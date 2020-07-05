import { Field, ObjectType } from '@nestjs/graphql';
import { AutoMap } from 'nestjsx-automapper';
import { ProjectInformationDto } from './project-information.dto';
import { ProjectLaneDto } from './project-lane.dto';

@ObjectType()
export class ProjectDto extends ProjectInformationDto {
  @Field((returns) => [ProjectLaneDto], { nullable: 'items' })
  @AutoMap(() => ProjectLaneDto)
  lanes: ProjectLaneDto[];
}
