import { Component, OnInit } from '@angular/core';
import { ProjectService } from './state/project/project.service';
import { AuthService, LoginPayload } from './auth/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  constructor(private _projectService: ProjectService, private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.login(new LoginPayload());
    this._projectService.getProject();
  }
}
