import { Component, OnInit } from '@angular/core';
import { ProjectService } from './state/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this._projectService.getProject().subscribe();
  }
}
