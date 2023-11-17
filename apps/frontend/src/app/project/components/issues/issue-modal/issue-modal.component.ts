import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JIssue } from '@trunk18/interface';
import { ProjectService } from '@trunk18/project';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { DeleteIssueModel } from '@trunk18/interface';
import { ProjectQuery } from '@trunk18/project';

@Component({
  selector: 'issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss'],
})
export class IssueModalComponent {
  issue$: Observable<JIssue>;

  constructor(
    private _modal: NzModalRef,
    private _router: Router,
    private _projectService: ProjectService,
    private _projectQuery: ProjectQuery,
    @Inject(NZ_MODAL_DATA) public data: any
  ) {
    this.issue$ = this._projectQuery.issueById$(this.data.issueId);
  }

  closeModal() {
    this._modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['project', 'issue', issueId]);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this._projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.closeModal();
  }
}
