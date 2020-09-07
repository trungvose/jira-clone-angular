import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProjectDto, ProjectIssueDetailDto } from '@trungk18/core/graphql/service/graphql';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';
import { ProjectConst } from '@trungk18/project/config/const';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'full-issue-detail',
  templateUrl: './full-issue-detail.component.html',
  styleUrls: ['./full-issue-detail.component.scss'],
})
@UntilDestroy()
export class FullIssueDetailComponent implements OnInit {
  project: ProjectDto;
  issueById$: Observable<ProjectIssueDetailDto>;
  issueId: string;
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Issues', this.issueId];
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _projectQuery: ProjectQuery,
    private _projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.getIssue();
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
    });
  }

  private getIssue() {
    this.issueId = this._route.snapshot.paramMap.get(ProjectConst.IssueId);
    if (!this.issueId) {
      this.backHome();
      return;
    }
    this.issueById$ = this._projectService.findIssueById(this.issueId);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this._projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.backHome();
  }

  private backHome() {
    this._router.navigate(['/']);
  }
}
