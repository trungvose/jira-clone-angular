import { Component, Input } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { JUser } from '@trungk18/interface/user';
import { UserComponent } from '../../user/user.component';
import { NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
    selector: 'issue-reporter-select',
    templateUrl: './issue-reporter-select.component.html',
    styleUrls: ['./issue-reporter-select.component.scss'],
    standalone: true,
    imports: [NzSelectModule, ReactiveFormsModule, NgFor, UserComponent]
})
export class IssueReporterSelectComponent {
  @Input() control: UntypedFormControl;
  @Input() users: JUser[];

  constructor() {}

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
