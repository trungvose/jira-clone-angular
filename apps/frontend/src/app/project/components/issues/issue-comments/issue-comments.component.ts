import { Component, Input } from '@angular/core';
import { JIssue } from '@trunk18/interface';

@Component({
  selector: 'issue-comments',
  templateUrl: './issue-comments.component.html',
  styleUrls: ['./issue-comments.component.scss'],
})
export class IssueCommentsComponent {
  @Input() issue: JIssue;

  constructor() {}
}
