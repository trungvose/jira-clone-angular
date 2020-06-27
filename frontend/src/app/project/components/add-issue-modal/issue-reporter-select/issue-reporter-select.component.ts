import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JUser } from '@trungk18/interface/user';

@Component({
  selector: 'issue-reporter-select',
  templateUrl: './issue-reporter-select.component.html',
  styleUrls: ['./issue-reporter-select.component.scss']
})
export class IssueReporterSelectComponent implements OnInit {
  @Input() control: FormControl;
  @Input() users: JUser[];

  constructor() {}

  ngOnInit(): void {}

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
