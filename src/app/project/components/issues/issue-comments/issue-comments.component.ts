import { Component, Input  } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { NgFor } from '@angular/common';
import { IssueCommentComponent } from '../issue-comment/issue-comment.component';

@Component({
    selector: 'issue-comments',
    templateUrl: './issue-comments.component.html',
    styleUrls: ['./issue-comments.component.scss'],
    standalone: true,
    imports: [IssueCommentComponent, NgFor]
})
export class IssueCommentsComponent {
  @Input() issue: JIssue;

  constructor() {}
}
