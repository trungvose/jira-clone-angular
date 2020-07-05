import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JiraRoutingConst } from '@trungk18/core/utils/jira-routing.const';
import { ProjectService } from './state/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this.getProjectBySlug();
    this.handleResize();
  }

  private getProjectBySlug() {
    let slug = this._route.snapshot.paramMap.get(JiraRoutingConst.Slug);
    if (!slug) {
      //TODO: Redirect to the project list
      this._router.navigate([`/${JiraRoutingConst.Login}`]);
      return;
    }
    this._projectService.getProject(slug).subscribe();
  }

  handleResize() {
    const match = window.matchMedia('(min-width: 1024px)');
    match.addEventListener('change', (e) => {
      this.expanded = e.matches;
    });
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }
}
