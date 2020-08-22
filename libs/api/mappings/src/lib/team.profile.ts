import { TeamDto } from '@ngvn/api/dtos';
import { Team } from '@ngvn/api/team';
import { Profile, ProfileBase, AutoMapper } from 'nestjsx-automapper';

@Profile()
export class TeamProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Team, TeamDto).reverseMap();
  }
}
