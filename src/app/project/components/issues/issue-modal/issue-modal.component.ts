import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JIssue } from '@trungk18/interface/issue';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';
import { AsyncPipe } from '@angular/common';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';

@Component({
    selector: 'issue-modal',
    templateUrl: './issue-modal.component.html',
    styleUrls: ['./issue-modal.component.scss'],
    imports: [IssueDetailComponent, AsyncPipe]
})
export class IssueModalComponent {
  issue$: Observable<JIssue>;

  constructor(
    private _modal: NzModalRef,
    private _router: Router,
    private _projectService: ProjectService,
    @Inject(NZ_MODAL_DATA) private modalData: { issue$: Observable<JIssue> }
  ) {
    this.issue$ = this.modalData.issue$;
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
