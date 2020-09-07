import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectIssueDetailDto } from '@trungk18/core/graphql/service/graphql';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
})
export class IssueModalComponent implements OnInit {
  @Input() issue$: Observable<ProjectIssueDetailDto>;

  constructor(
    private _modal: NzModalRef,
    private _router: Router,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this._modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['projects', 'issue', issueId]);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this._projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.closeModal();
  }
}
