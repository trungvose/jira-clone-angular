import { ProjectIssueDto, ProjectLaneDto } from '@ngvn/api/dtos';
import { ProjectIssue, ProjectLane } from '@ngvn/api/project';
import { AutoMapper, mapWith, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class ProjectLaneProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProjectLane, ProjectLaneDto).forMember(
      (d) => d.issues,
      mapWith(
        ProjectIssueDto,
        (s) => s.issues,
        () => ProjectIssue,
      ),
    );
  }
}
