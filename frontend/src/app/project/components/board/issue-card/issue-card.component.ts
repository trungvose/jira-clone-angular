import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JIssue, IssuePriority, IssuePriorityColors } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { JUser } from '@trungk18/interface/user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueModalComponent } from '../issue-modal/issue-modal.component';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
@UntilDestroy()
export class IssueCardComponent implements OnChanges {
  @Input() issue: JIssue;
  assignees: JUser[];
  issueTypeIcon: string;
  priorityIcon: PriorityIcon;

  constructor(private _projectQuery: ProjectQuery, private _modalService: NzModalService) {}

  ngOnInit(): void {
    this._projectQuery.users$.pipe(untilDestroyed(this)).subscribe((users) => {
      this.assignees = this.issue.userIds.map((userId) => users.find((x) => x.id === userId));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let issueChange = changes.issue;
    if (issueChange?.currentValue !== issueChange.previousValue) {
      this.issueTypeIcon = this.issue.type?.toLowerCase();
      this.getIssuePriorityIcon();
    }
  }

  getIssuePriorityIcon() {
    this.priorityIcon = new PriorityIcon(this.issue.priority);
  }

  openIssueDetail(issueId: string) {
    this._modalService.create({
      nzContent: IssueModalComponent,
      nzClosable: false,
      nzFooter: null
    });
  }
}

class PriorityIcon {
  name: string;
  label: string;
  color: string;

  constructor(issuePriority: IssuePriority) {
    let lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
    this.label = issuePriority;
    this.name = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
    this.color = IssuePriorityColors[issuePriority];
  }
}
