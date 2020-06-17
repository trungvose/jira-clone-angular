import { Component, OnInit } from '@angular/core';
import { IssueStatus } from 'src/app/interface/issue';

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
    IssueStatus.DONE,
  ]
  constructor() {}

  ngOnInit(): void {}
}
