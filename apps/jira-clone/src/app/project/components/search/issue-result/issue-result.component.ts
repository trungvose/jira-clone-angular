import { Component, Input, OnInit } from '@angular/core';
import { ProjectIssueDto } from '@trungk18/core/graphql/service/graphql';
import { IssueUtil } from '@trungk18/project/utils/issue';

@Component({
  selector: 'issue-result',
  templateUrl: './issue-result.component.html',
  styleUrls: ['./issue-result.component.scss']
})
export class IssueResultComponent implements OnInit {
  @Input() issue: ProjectIssueDto;

  get issueTypeIcon() {
    return IssueUtil.getIssueTypeIcon(this.issue?.type);
  }

  constructor() {}

  ngOnInit(): void {}
}
