import { Component, Input } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { JUser } from '@trungk18/interface/user';
import { UserComponent } from '../../user/user.component';

import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
    selector: 'issue-reporter-select',
    templateUrl: './issue-reporter-select.component.html',
    styleUrls: ['./issue-reporter-select.component.scss'],
    imports: [NzSelectComponent, ReactiveFormsModule, NzOptionComponent, UserComponent]
})
export class IssueReporterSelectComponent {
  @Input() control: UntypedFormControl;
  @Input() users: JUser[];

  constructor() {}

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
