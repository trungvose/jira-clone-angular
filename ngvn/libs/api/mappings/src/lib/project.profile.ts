import { ProjectDto, ProjectInformationDto, ProjectLaneDto, TeamDto, UserDto } from '@ngvn/api/dtos';
import { Project, ProjectLane } from '@ngvn/api/project';
import { Team } from '@ngvn/api/team';
import { User } from '@ngvn/api/user';
import { AutoMapper, mapWith, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class ProjectProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Project, ProjectInformationDto)
      .forMember(
        (d) => d.owner,
        mapWith(
          UserDto,
          (s) => s.owner,
          () => User,
        ),
      )
      .forMember(
        (d) => d.users,
        mapWith(
          UserDto,
          (s) => s.users,
          () => User,
        ),
      )
      .forMember(
        (d) => d.teams,
        mapWith(
          TeamDto,
          (s) => s.teams,
          () => Team,
        ),
      );
    mapper.createMap(Project, ProjectDto, { includeBase: [Project, ProjectInformationDto] }).forMember(
      (d) => d.lanes,
      mapWith(
        ProjectLaneDto,
        (s) => s.lanes,
        () => ProjectLane,
      ),
    );
  }
}
