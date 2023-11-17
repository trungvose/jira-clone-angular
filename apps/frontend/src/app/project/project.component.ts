import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@trunk18/project';
import { AuthService } from '@trunk18/project';
import { LoginPayload } from '@trunk18/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  constructor(
    private _projectService: ProjectService,
    private _authService: AuthService
  ) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this._authService.login(new LoginPayload());
    this._projectService.getProject();
    this.handleResize();
  }

  handleResize() {
    const match = window.matchMedia('(min-width: 1024px)');
    match.addEventListener('change', (e) => {
      console.log(e);
      this.expanded = e.matches;
    });
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }
}
