import { Component, Input } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { IssuePriority } from '@trungk18/interface/issue';
import { ProjectConst } from '@trungk18/project/config/const';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';
import { NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
    selector: 'issue-priority-select',
    templateUrl: './issue-priority-select.component.html',
    styleUrls: ['./issue-priority-select.component.scss'],
    standalone: true,
    imports: [NzSelectModule, ReactiveFormsModule, NgFor, SvgIconComponent]
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
