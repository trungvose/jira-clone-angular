import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { IssuePriorityIcon } from '@trunk18/project';
import { IssueUtil } from '@trunk18/project';
import { IssuePriority } from '@trunk18/interface';
import { ProjectConst } from '@trunk18/project';

@Component({
  selector: 'issue-priority-select',
  templateUrl: './issue-priority-select.component.html',
  styleUrls: ['./issue-priority-select.component.scss'],
})
export class IssuePrioritySelectComponent {
  @Input() control: UntypedFormControl;
  priorities: IssuePriorityIcon[];

  constructor() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  getPriorityIcon(priority: IssuePriority) {
    return IssueUtil.getIssuePriorityIcon(priority);
  }
}
