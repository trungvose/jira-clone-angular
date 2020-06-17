import { Component, OnInit } from '@angular/core';
import { IssueStatus, JIssue, IssueType, IssuePriority } from '@trungk18/interface/issue';

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

  issues: JIssue[] = [
    {
      id: "d65047e5-f4cf-4caa-9a38-6073dcbab7d1",
      title: "TailwindCSS configuration",
      type: IssueType.TASK,
      priority: IssuePriority.MEDIUM,
      listPosition: 0,
      description: "Configuration whitelist",
      estimate: 120,
      timeSpent: 90,
      timeRemaining: 30,
      createdAt: "2020-06-13T14:00:00.000Z",
      updatedAt: "2020-06-13T14:00:00.000Z",
      reporterId: "userId3",
      userIds: [
        "userId1",
        "userId2"
      ],
      comments: [],
      projectId: "Id1",
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
