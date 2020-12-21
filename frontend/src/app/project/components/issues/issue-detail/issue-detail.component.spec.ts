import {IssueDetailComponent} from '@trungk18/project/components/issues/issue-detail/issue-detail.component';
import {IssuePriority, IssueStatus, IssueType} from '@trungk18/interface/issue';

describe('IssueDetailComponent', () => {
  let component: IssueDetailComponent;

  const projectQuery: any = {

  };
  const nzModalService: any = {
    create: jasmine.createSpy('create').and.callThrough()
  };
  beforeEach(() => {
    component = new IssueDetailComponent(
      projectQuery,
      nzModalService
    );
    component.issue = {
      id: '',
      title: '',
      type: IssueType.TASK,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOW,
      listPosition: 0,
      description: '',
      estimate: 0,
      timeSpent: 0,
      timeRemaining: 0,
      createdAt: '',
      updatedAt: '',
      reporterId: '',
      userIds: [],
      comments: [],
      projectId: ''
    };
  });

  it('should be able to open Delete Issue Modal', () => {
    component.openDeleteIssueModal();
    expect(nzModalService.create).toHaveBeenCalled();
  });
  it('should be able to close Modal', () => {
    spyOn(component.onClosed, 'emit').and.callThrough();
    component.closeModal();
    expect(component.onClosed.emit).toHaveBeenCalled();
  });
  it('should be able to open Issue Page', () => {
    spyOn(component.onOpenIssue, 'emit').and.callThrough();
    component.openIssuePage();
    expect(component.onOpenIssue.emit).toHaveBeenCalled();
  });
});
