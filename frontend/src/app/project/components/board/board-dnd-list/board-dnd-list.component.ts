import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IssueStatusDisplay, IssueStatus, JIssue } from '@trungk18/interface/issue';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss']
})
export class BoardDndListComponent implements OnInit {
  IssueStatusDisplay = IssueStatusDisplay;
  @Input() status: IssueStatus;
  @Input() issues: JIssue[];
  get issuesCount(): number {
    return 0;
  }

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray([], event.previousIndex, event.currentIndex);
  }
}
