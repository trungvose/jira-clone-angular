import { Component, Input, ViewEncapsulation } from '@angular/core';
import { JUser } from '@trungk18/interface/user';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../../user/user.component';
import { NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
    selector: 'issue-assignees-select',
    templateUrl: './issue-assignees-select.component.html',
    styleUrls: ['./issue-assignees-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NzSelectModule, ReactiveFormsModule, NgFor, UserComponent]
})
export class IssueAssigneesSelectComponent {
  @Input() control: UntypedFormControl;
  @Input() users: JUser[];

  constructor() {}

  getUser(userId: string): any {
    return this.users.find((user) => user.id === userId);
  }
}
