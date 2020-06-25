import { Component, Input, OnInit } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';

@Component({
  selector: 'issue-comments',
  templateUrl: './issue-comments.component.html',
  styleUrls: ['./issue-comments.component.scss']
})
export class IssueCommentsComponent implements OnInit {
  @Input() issue: JIssue;

  constructor() {}

  ngOnInit(): void {}
}
