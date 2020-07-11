import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project } from './models';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [MongooseModule.forFeature([Project.featureConfig])],
  providers: [ProjectRepository, ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ApiProjectModule {}
