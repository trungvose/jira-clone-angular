import { Component, OnInit, Input } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';

@Component({
  selector: 'issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss']
})
export class IssueDescriptionComponent implements OnInit {
  @Input() issue: JIssue;
  isEditing: boolean

  isWorking: boolean;
  constructor() {}

  ngOnInit(): void {}
}
