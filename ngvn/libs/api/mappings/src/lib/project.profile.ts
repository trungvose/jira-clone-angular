import { ProjectDto, ProjectIssueDto, TeamDto, UserDto } from '@ngvn/api/dtos';
import { Project } from '@ngvn/api/project';
import { Profile, ProfileBase, AutoMapper, mapWith } from 'nestjsx-automapper';

@Profile()
export class ProjectProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Project, ProjectDto)
      .forMember(
        (d) => d.users,
        mapWith(UserDto, (s) => s.users),
      )
      .forMember(
        (d) => d.teams,
        mapWith(TeamDto, (s) => s.teams),
      )
      .forMember(
        (d) => d.issues,
        mapWith(ProjectIssueDto, (s) => s.issues),
      );
  }
}
