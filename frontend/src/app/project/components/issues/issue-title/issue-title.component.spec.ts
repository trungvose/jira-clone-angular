import { FormControl } from '@angular/forms';
import { IssueTitleComponent } from './issue-title.component';
import {SimpleChange} from '@angular/core';
import {JComment} from '@trungk18/interface/comment';
import {IssuePriority, IssueStatus, IssueType} from '@trungk18/interface/issue';

describe('IssueTitleComponent', () => {
  let component: IssueTitleComponent;

  const projectService: any = {
    updateIssue: jasmine.createSpy('updateIssue').and.callThrough()
  };

  beforeEach(() => {
    component = new IssueTitleComponent(
      projectService
    );
    component.titleControl = new FormControl('test');
  });

  it('should be able to make onBlur action', () => {
    component.onBlur();
    expect(projectService.updateIssue).toHaveBeenCalled();
  });
  it('should be able to change title', () => {
    component.issue = {
      id: '',
      title: 'New title',
      type: IssueType.BUG,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.HIGH,
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
    component.ngOnChanges({
      issue: new SimpleChange(null, {title: 'New title'}, null)
    });
    expect(component.titleControl.value).toEqual('New title');
  });
  it('should not be able to change title', () => {
    component.issue = {
      id: '',
      title: 'New title 2',
      type: IssueType.BUG,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.HIGH,
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

    const expected = {title: 'New title'};

    component.ngOnChanges({
      issue: new SimpleChange(expected, expected, null)
    });
    expect(component.titleControl.value).toEqual('test');
  });
});
