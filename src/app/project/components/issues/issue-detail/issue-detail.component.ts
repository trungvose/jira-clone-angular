import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueDeleteModalComponent } from '../issue-delete-modal/issue-delete-modal.component';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';
import { IssueLoaderComponent } from '../issue-loader/issue-loader.component';
import { IssuePriorityComponent } from '../issue-priority/issue-priority.component';
import { IssueAssigneesComponent } from '../issue-assignees/issue-assignees.component';
import { IssueReporterComponent } from '../issue-reporter/issue-reporter.component';
import { IssueStatusComponent } from '../issue-status/issue-status.component';
import { IssueCommentsComponent } from '../issue-comments/issue-comments.component';
import { IssueDescriptionComponent } from '../issue-description/issue-description.component';
import { IssueTitleComponent } from '../issue-title/issue-title.component';
import { ButtonComponent } from '../../../../jira-control/button/button.component';
import { IssueTypeComponent } from '../issue-type/issue-type.component';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'issue-detail',
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.scss'],
    standalone: true,
    imports: [NgIf, IssueTypeComponent, ButtonComponent, IssueTitleComponent, IssueDescriptionComponent, IssueCommentsComponent, IssueStatusComponent, IssueReporterComponent, IssueAssigneesComponent, IssuePriorityComponent, IssueLoaderComponent, AsyncPipe, DatePipe]
})
export class IssueDetailComponent{
  @Input() issue: JIssue;
  @Input() isShowFullScreenButton: boolean;
  @Input() isShowCloseButton: boolean;
  @Output() onClosed = new EventEmitter();
  @Output() onOpenIssue = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<DeleteIssueModel>();

  constructor(public projectQuery: ProjectQuery, private _modalService: NzModalService) {}

  openDeleteIssueModal() {
    this._modalService.create({
      nzContent: IssueDeleteModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzStyle: {
        top: '140px'
      },
      nzComponentParams: {
        issueId: this.issue.id,
        onDelete: this.onDelete
      }
    });
  }

  closeModal() {
    this.onClosed.emit();
  }

  openIssuePage() {
    this.onOpenIssue.emit(this.issue.id);
  }
}
