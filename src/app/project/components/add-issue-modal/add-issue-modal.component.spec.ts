import { AddIssueModalComponent } from '@trungk18/project/components/add-issue-modal/add-issue-modal.component';

describe('AddIssueModalComponent', () => {
  let component: AddIssueModalComponent;

  const formBuilder: any = {
    group: vi.fn().mockReturnValue({
      invalid: false,
      getRawValue: vi.fn()
    }),
  };
  const nzModalRef: any = {
    close: vi.fn()
  };
  const projectService: any = {
    updateIssue: vi.fn()
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
