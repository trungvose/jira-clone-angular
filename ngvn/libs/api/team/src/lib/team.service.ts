import { Injectable } from '@nestjs/common';
import { BaseService } from '@ngvn/api/common';
import { Team } from './team.model';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService extends BaseService<Team> {
  constructor(private readonly teamRepository: TeamRepository) {
    super(teamRepository);
  }
}
