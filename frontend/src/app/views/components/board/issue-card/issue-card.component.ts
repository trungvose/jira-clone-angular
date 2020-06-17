import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JIssue, IssuePriority, IssuePriorityColors } from '@trungk18/interface/issue';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnChanges {
  @Input() issue: JIssue;
  issueTypeIcon: string;
  priorityIcon: PriorityIcon;
  constructor() {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    let issueChange = changes.issue;
    if(issueChange?.currentValue !== issueChange.previousValue) {
      this.issueTypeIcon = this.issue.type?.toLowerCase();
      this.getIssuePriorityIcon();
    }
  }

  getIssuePriorityIcon() {    
    this.priorityIcon = new PriorityIcon(this.issue.priority)
  }

  openIssueDetail() {}
}

class PriorityIcon {
  name: string;
  color: string;

  constructor(issuePriority: IssuePriority){
    let lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
    this.name = lowerPriorities.includes(issuePriority) ? "arrow-down": "arrow-up";
    this.color = IssuePriorityColors[issuePriority];
  }
}