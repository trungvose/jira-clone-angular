import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ProjectIssueDto, UserDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-assignees',
  templateUrl: './issue-assignees.component.html',
  styleUrls: ['./issue-assignees.component.scss']
})
@UntilDestroy()
export class IssueAssigneesComponent implements OnInit, OnChanges {
  @Input() issue: ProjectIssueDto;
  @Input() users: UserDto[];

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {}

  removeUser() {
    this._projectService.updateIssue({
      ...this.issue,
      main: null
    });
  }

  replaceUser(user: UserDto) {
    this._projectService.updateIssue({
      ...this.issue,
      main: {
        ...user
      }
    });
  }

  isUserSelected(user: UserDto): boolean {
    return this.issue.main?.id === user.id;
  }
}
