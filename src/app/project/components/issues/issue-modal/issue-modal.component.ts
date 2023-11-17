import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JIssue } from '@trungk18/interface/issue';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';

@Component({
  selector: 'issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
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
