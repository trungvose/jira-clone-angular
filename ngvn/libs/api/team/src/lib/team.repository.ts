import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@ngvn/api/common';
import { ModelType } from '@ngvn/api/types';
import { Team } from './team.model';

@Injectable()
export class TeamRepository extends BaseRepository<Team> {
  constructor(@InjectModel(Team.modelName) private readonly teamModel: ModelType<Team>) {
    super(teamModel);
  }
}
