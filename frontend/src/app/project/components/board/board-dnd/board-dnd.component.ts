import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IssueStatus } from '@trungk18/interface/issue';
import { JProject } from '@trungk18/interface/project';
import { JiraApiService } from '@trungk18/project/project.service';
@UntilDestroy()
@Component({
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
export class BoardDndComponent implements OnInit {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  project: JProject;

  constructor(private _api: JiraApiService) {}

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    this._api
      .getProject()
      .pipe(untilDestroyed(this))
      .subscribe((project) => {
        this.project = project;
      });
  }
}
