import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { JUser } from '@trunk18/interface';

@Component({
  selector: 'issue-reporter-select',
  templateUrl: './issue-reporter-select.component.html',
  styleUrls: ['./issue-reporter-select.component.scss'],
})
export class IssueReporterSelectComponent {
  @Input() control: UntypedFormControl;
  @Input() users: JUser[];

  constructor() {}

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
