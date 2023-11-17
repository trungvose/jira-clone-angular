import { Component, EventEmitter, Inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';

@Component({
  selector: 'issue-delete-modal',
  templateUrl: './issue-delete-modal.component.html',
  styleUrls: ['./issue-delete-modal.component.scss']
})
export class IssueDeleteModalComponent {
  issueId: string;
  onDelete: EventEmitter<DeleteIssueModel>;

  constructor(private _modalRef: NzModalRef, @Inject(NZ_MODAL_DATA) public data: any) {
    this.issueId = this.data.issueId;
    this.onDelete = this.data.onDelete;
  }

  deleteIssue() {
    this.onDelete.emit(new DeleteIssueModel(this.issueId, this._modalRef));
  }

  closeModal() {
    this._modalRef.close();
  }
}
