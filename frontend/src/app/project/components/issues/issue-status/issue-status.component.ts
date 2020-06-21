import { Component, OnInit, Input } from '@angular/core';
import { JIssue, IssueStatusDisplay } from '@trungk18/interface/issue';

@Component({
  selector: 'issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss']
})
export class IssueStatusComponent implements OnInit {
  @Input() issue: JIssue;
  IssueStatusDisplay = IssueStatusDisplay;

  constructor() {}

  ngOnInit(): void {}
}
