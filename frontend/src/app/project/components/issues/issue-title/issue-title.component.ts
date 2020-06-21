import { Component, OnInit, Input } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';

@Component({
  selector: 'issue-title',
  templateUrl: './issue-title.component.html',
  styleUrls: ['./issue-title.component.scss']
})
export class IssueTitleComponent implements OnInit {
  @Input() issue: JIssue;

  constructor() {}

  ngOnInit(): void {}
}
