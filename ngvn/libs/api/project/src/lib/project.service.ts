import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from '@ngvn/api/caching';
import { BaseService } from '@ngvn/api/common';
import { MoveIssueParamsDto, ProjectDto, ProjectInformationDto, ReorderIssueParamsDto } from '@ngvn/api/dtos';
import { ProjectIssueJob, projectIssueQueueName } from '@ngvn/background/common';
import { ProjectIssueStatus } from '@ngvn/shared/project';
import { Queue } from 'bull';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Project } from './models';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly cacheService: CacheService,
    @InjectMapper() private readonly mapper: AutoMapper,
    @InjectQueue(projectIssueQueueName) private readonly projectIssueQueue: Queue,
  ) {
    super(projectRepository);
  }

  async isProjectExistById(id: string): Promise<boolean> {
    return await this.projectRepository.exists({ _id: id });
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

  async findIssuesCountById(id: string): Promise<number> {
    return await this.projectRepository
      .findById(id, { autopopulate: false })
      .map((project) => project.issues.length)
      .exec();
  }

  async updateLanesWithIssue(
    projectId: string,
    issueId: string,
    ...statuses: ProjectIssueStatus[]
  ): Promise<ProjectDto> {
    const project = await this.projectRepository.findById(projectId).exec();

    if (project == null) {
      throw new NotFoundException(projectId, 'Project not found');
    }

    const [toStatus, fromStatus] = statuses;
    const targetLane = project.lanes.find((lane) =>
      lane.conditions.some((c) => c.issueField === 'status' && c.value === toStatus),
    );

    if (targetLane == null) {
      throw new NotFoundException(toStatus, 'No lane found');
    }

    targetLane.issues.push(this.toObjectId(issueId));
    if (fromStatus == null) {
      const fromLane = project.lanes.find((lane) =>
        lane.conditions.some((c) => c.issueField === 'status' && c.value === fromStatus),
      );
      if (fromLane == null) {
        throw new NotFoundException(fromStatus, 'No lane found');
      }
      fromLane.issues = fromLane.issues.filter((issue) => issue.toString() !== issueId);
      const result = await this.projectRepository.moveIssue({
        projectId,
        targetLaneId: targetLane.id,
        targetIssues: targetLane.issues.map((issue) => issue.toString()),
        previousLaneId: fromLane.id,
        previousIssues: fromLane.issues.map((issue) => issue.toString()),
      });
      return this.mapper.map(result, ProjectDto, Project);
    }

    const result = await this.projectRepository.reorderIssue({
      projectId,
      laneId: targetLane.id,
      issues: targetLane.issues.map((issue) => issue.toString()),
    });
    return this.mapper.map(result, ProjectDto, Project);
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

  async moveIssue({
    projectId,
    targetLaneId,
    targetIssues,
    previousLaneId,
    previousIssues,
  }: MoveIssueParamsDto): Promise<ProjectDto> {
    const project = await this.projectRepository.findById(projectId, { autopopulate: false }).exec();
    if (project == null) {
      throw new NotFoundException(projectId, 'No project found with id');
    }

    if (!project.lanes.some((lane) => lane.id === targetLaneId)) {
      throw new NotFoundException(targetLaneId, 'No target lane found with id');
    }

    if (!project.lanes.some((lane) => lane.id === previousLaneId)) {
      throw new NotFoundException(previousLaneId, 'No previous lane found with id');
    }

    const result = await this.projectRepository.moveIssue({
      targetLaneId,
      projectId,
      previousIssues,
      previousLaneId,
      targetIssues,
    });
    await this.projectIssueQueue.add(
      ProjectIssueJob.BulkUpdateStatus,
      result.lanes.find((lane) => lane.id === targetLaneId),
    );
    return this.mapper.map(result, ProjectDto, Project);
  }
}
