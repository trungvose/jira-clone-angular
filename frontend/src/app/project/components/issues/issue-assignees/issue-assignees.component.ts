import { Component, OnInit, Input } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { Observable } from 'rxjs';
import { JUser } from '@trungk18/interface/user';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'issue-assignees',
  templateUrl: './issue-assignees.component.html',
  styleUrls: ['./issue-assignees.component.scss']
})
@UntilDestroy()
export class IssueAssigneesComponent implements OnInit {
  @Input() issue: JIssue;
  @Input() users$: Observable<JUser[]>;
  assignees: JUser[];
  reporter: JUser;

  constructor() {}

  ngOnInit(): void {
    this.users$.pipe(untilDestroyed(this)).subscribe((users) => {
      this.assignees = this.issue.userIds.map((userId) => users.find((x) => x.id === userId));
      this.reporter = users.find((x) => x.id === this.issue.reporterId);
    });
  }
}
