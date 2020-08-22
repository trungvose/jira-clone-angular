import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ProjectConst } from '@trungk18/project/config/const';
import { ProjectIssuePriority, ProjectIssueDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-priority',
  templateUrl: './issue-priority.component.html',
  styleUrls: ['./issue-priority.component.scss']
})
export class IssuePriorityComponent implements OnInit, OnChanges {
  selectedPriority: ProjectIssuePriority;

  get selectedPriorityIcon() {
    return IssueUtil.getIssuePriorityIcon(this.selectedPriority);
  }

  priorities: IssuePriorityIcon[];

  @Input() issue: ProjectIssueDto;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  ngOnChanges(): void {
    this.selectedPriority = this.issue?.priority;
  }

  isPrioritySelected(priority: ProjectIssuePriority) {
    return priority === this.selectedPriority;
  }

  updateIssue(priority: ProjectIssuePriority) {
    this.selectedPriority = priority;
    this._projectService.updateIssue({
      ...this.issue,
      priority: this.selectedPriority
    });
  }
}
