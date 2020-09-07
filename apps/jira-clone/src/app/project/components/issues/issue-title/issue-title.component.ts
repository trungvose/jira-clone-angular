import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ProjectIssueDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-title',
  templateUrl: './issue-title.component.html',
  styleUrls: ['./issue-title.component.scss'],
})
export class IssueTitleComponent implements OnChanges {
  @Input() issue: ProjectIssueDto;
  titleControl: FormControl;

  constructor(private _projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let issueChange = changes.issue;
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.titleControl = new FormControl(this.issue.title);
    }
  }

  onBlur() {    
    this._projectService
      .updateIssue({
        ...this.issue,
        title: this.titleControl.value,
      })
      .subscribe();
  }
}
