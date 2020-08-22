import { Resolver } from '@nestjs/graphql';
import { TeamService } from './team.service';

@Resolver()
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}
}
