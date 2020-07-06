import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from '@ngvn/api/caching';
import { BaseService } from '@ngvn/api/common';
import { ProjectDto, ProjectInformationDto, ReorderIssueParamsDto } from '@ngvn/api/dtos';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { Project } from './models';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly cacheService: CacheService,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {
    super(projectRepository);
  }

  async findBySlug(slug: string): Promise<ProjectDto> {
    const project = await this.projectRepository.findBySlug(slug);
    return this.mapper.map(project, ProjectDto, Project);
  }

  async findByUserId(userId: string): Promise<ProjectInformationDto[]> {
    const projects = await this.cacheService.get(`projects_user_${userId}`, () =>
      this.projectRepository.findByUser(userId),
    );
    return this.mapper.mapArray(projects, ProjectInformationDto, Project);
  }

  async reorderIssue({ laneId, projectId, issues }: ReorderIssueParamsDto): Promise<ProjectDto> {
    const project = await this.projectRepository.findById(projectId, { autopopulate: false }).exec();
    if (project == null) {
      throw new NotFoundException(projectId, 'No project found with id');
    }

    const lane = project.lanes.find((lane) => lane.id === laneId);
    if (lane == null) {
      throw new NotFoundException(laneId, 'No lane found with id');
    }

    const result = await this.projectRepository.reorderIssue({
      laneId,
      projectId,
      issues,
    });
    return this.mapper.map(result, ProjectDto, Project);
  }

  async findLane(projectId: string, laneId: string) {
    const project = await this.projectRepository.findById(projectId);
    if (project == null) {
      throw new NotFoundException(projectId, 'No project found with id');
    }

    const lane = project.lanes.find((lane) => lane.id === laneId);
    if (lane == null) {
      throw new NotFoundException(laneId, 'No lane found with id');
    }
  }
}
