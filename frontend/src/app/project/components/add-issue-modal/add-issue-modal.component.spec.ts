import { AddIssueModalComponent } from '@trungk18/project/components/add-issue-modal/add-issue-modal.component';

describe('AddIssueModalComponent', () => {
  let component: AddIssueModalComponent;

  const formBuilder: any = {
    group: jasmine.createSpy('group').and.returnValue({
      invalid: false,
      getRawValue: jasmine.createSpy('getRawValue')
    }),
  };
  const nzModalRef: any = {
    close: jasmine.createSpy('close').and.callThrough()
  };
  const projectService: any = {
    updateIssue: jasmine.createSpy('updateIssue')
  };
  const projectQuery: any = {};

  beforeEach(() => {
    component = new AddIssueModalComponent(
      formBuilder,
      nzModalRef,
      projectService,
      projectQuery
    );
  });

  it('should be able to initForm', () => {
    component.initForm();
    expect(formBuilder.group).toHaveBeenCalled();
  });
  it('should be able to submit Form', () => {
    component.initForm();
    component.submitForm();
    expect(projectService.updateIssue).toHaveBeenCalled();
    expect(formBuilder.group).toHaveBeenCalled();
  });
});
