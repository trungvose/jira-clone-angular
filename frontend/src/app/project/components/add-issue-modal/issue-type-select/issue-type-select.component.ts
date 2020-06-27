import { Component, OnInit, Input } from '@angular/core';
import { IssueType } from '@trungk18/interface/issue';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { IssueTypeWithIcon, IssueTypes } from '@trungk18/interface/issue-type';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'issue-type-select',
  templateUrl: './issue-type-select.component.html',
  styleUrls: ['./issue-type-select.component.scss']
})
export class IssueTypeSelectComponent implements OnInit {
  @Input() control: FormControl;
  
  issueTypes: IssueTypeWithIcon[];

  constructor() {
    this.issueTypes = IssueTypes;
  }

  ngOnInit(): void {}

  getIssueTypeIcon(issueType: IssueType) {
    return IssueUtil.getIssueTypeIcon(issueType);
  }
}
