import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-reporter-select',
  templateUrl: './issue-reporter-select.component.html',
  styleUrls: ['./issue-reporter-select.component.scss']
})
export class IssueReporterSelectComponent implements OnInit {
  @Input() control: FormControl;
  @Input() users: UserDto[];

  constructor() {}

  ngOnInit(): void {}

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
