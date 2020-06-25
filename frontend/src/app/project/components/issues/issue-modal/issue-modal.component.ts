import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { JIssue } from '@trungk18/interface/issue';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@Component({
  selector: 'issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
})
@UntilDestroy()
export class IssueModalComponent implements OnInit {
  @Input() issue$: Observable<JIssue>;

  constructor(private _modal: NzModalRef, private _router: Router) {}

  ngOnInit(): void {}

  closeModal() {
    this._modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['project', 'issue', issueId]);
  }
}
