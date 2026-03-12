import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { JIssue } from '@trungk18/interface/issue';
import { JUser } from '@trungk18/interface/user';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzDropDownADirective, NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';
import { UserComponent } from '../../user/user.component';
import { ButtonComponent } from '../../../../jira-control/button/button.component';


@Component({
    selector: 'issue-assignees',
    templateUrl: './issue-assignees.component.html',
    styleUrls: ['./issue-assignees.component.scss'],
    standalone: true,
    imports: [ButtonComponent, UserComponent, SvgIconComponent, NzDropDownADirective, NzDropDownDirective, NzIconDirective, NzDropdownMenuComponent, NzMenuDirective, NzMenuItemComponent]
})
@UntilDestroy()
export class IssueAssigneesComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;
  @Input() users: JUser[];
  assignees: JUser[];

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.assignees = this.issue.userIds.map((userId) => this.users.find((x) => x.id === userId));
  }

  ngOnChanges(changes: SimpleChanges) {
    const issueChange = changes.issue;
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.assignees = this.issue.userIds.map((userId) => this.users.find((x) => x.id === userId));
    }
  }

  removeUser(userId: string) {
    const newUserIds = this.issue.userIds.filter((x) => x !== userId);
    this._projectService.updateIssue({
      ...this.issue,
      userIds: newUserIds
    });
  }

  addUserToIssue(user: JUser) {
    this._projectService.updateIssue({
      ...this.issue,
      userIds: [...this.issue.userIds, user.id]
    });
  }

  isUserSelected(user: JUser): boolean {
    return this.issue.userIds.includes(user.id);
  }
}
