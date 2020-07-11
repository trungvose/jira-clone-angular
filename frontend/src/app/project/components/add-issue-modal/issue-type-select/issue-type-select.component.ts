import { Component, OnInit, Input } from '@angular/core';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { IssueTypeWithIcon } from '@trungk18/interface/issue-type-icon';
import { FormControl } from '@angular/forms';
import { ProjectConst } from '@trungk18/project/config/const';
import { ProjectIssueType } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-type-select',
  templateUrl: './issue-type-select.component.html',
  styleUrls: ['./issue-type-select.component.scss']
})
export class IssueTypeSelectComponent implements OnInit {
  @Input() control: FormControl;

  issueTypes: IssueTypeWithIcon[];

  constructor() {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  ngOnInit(): void {}

  getIssueTypeIcon(issueType: ProjectIssueType) {
    return IssueUtil.getIssueTypeIcon(issueType);
  }
}
