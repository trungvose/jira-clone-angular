import { Controller, Get } from '@nestjs/common';
import { Project } from './projects';

@Controller('project')
export class ProjectController {
  @Get()
  getProject() {
    return Project;
  }
}
