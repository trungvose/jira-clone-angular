import { Component, Input, OnInit } from '@angular/core';
import { ProjectIssueDto } from '@trungk18/core/graphql/service/graphql';
import { JComment } from '@trungk18/interface/comment';

@Component({
  selector: 'issue-comments',
  templateUrl: './issue-comments.component.html',
  styleUrls: ['./issue-comments.component.scss']
})
export class IssueCommentsComponent implements OnInit {
  comments: JComment[];
  @Input() issue: ProjectIssueDto;

  constructor() {
    //TODO fetch comment
    this.comments = []
  }

  ngOnInit(): void {}
}
