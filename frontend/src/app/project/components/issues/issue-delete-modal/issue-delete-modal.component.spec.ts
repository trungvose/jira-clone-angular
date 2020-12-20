import {IssueDeleteModalComponent} from '@trungk18/project/components/issues/issue-delete-modal/issue-delete-modal.component';

describe('IssueDeleteModalComponent', () => {
  let component: IssueDeleteModalComponent;

  const nzModalRef: any = {
    close: jasmine.createSpy('close')
  };

  beforeEach(() => {
    component = new IssueDeleteModalComponent(
      nzModalRef
    );
  });

  it('should have delete issue', () => {
    spyOn(component.onDelete, 'emit').and.callThrough();
    component.deleteIssue();
    expect(component.onDelete.emit).toHaveBeenCalled();
  });
  it('should ne able to close modal', () => {
    component.closeModal();
    expect(nzModalRef.close).toHaveBeenCalled();
  });
});
