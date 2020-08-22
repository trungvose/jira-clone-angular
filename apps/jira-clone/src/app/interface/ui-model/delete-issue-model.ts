import { NzModalRef } from 'ng-zorro-antd/modal';

export class DeleteIssueModel {
  constructor(public issueId: string, public deleteModalRef: NzModalRef) {}
}
