import {IssueDeleteModalComponent} from '@trungk18/project/components/issues/issue-delete-modal/issue-delete-modal.component';
import { EventEmitter } from '@angular/core';

describe('IssueDeleteModalComponent', () => {
  let component: IssueDeleteModalComponent;

  const nzModalRef: any = {
    close: vi.fn()
  };

  const modalData: any = {
    issueId: 'test-id',
    onDelete: new EventEmitter()
  };

  beforeEach(() => {
    component = new IssueDeleteModalComponent(
      nzModalRef,
      modalData
    );
  });

  it('should have delete issue', () => {
    vi.spyOn(component.onDelete, 'emit');
    component.deleteIssue();
    expect(component.onDelete.emit).toHaveBeenCalled();
  });
  it('should ne able to close modal', () => {
    component.closeModal();
    expect(nzModalRef.close).toHaveBeenCalled();
  });
});
