import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Team } from './team.model';
import { TeamRepository } from './team.repository';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
  imports: [MongooseModule.forFeature([Team.featureConfig])],
  providers: [TeamRepository, TeamService, TeamResolver],
  exports: [TeamService],
})
export class ApiTeamModule {}
