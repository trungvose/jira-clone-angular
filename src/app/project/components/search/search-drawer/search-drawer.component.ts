import { Component, OnInit, Signal } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JIssue } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable, of } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueModalComponent } from '../../issues/issue-modal/issue-modal.component';

@Component({
  selector: 'search-drawer',
  templateUrl: './search-drawer.component.html',
  styleUrls: ['./search-drawer.component.scss']
})
@UntilDestroy()
export class SearchDrawerComponent implements OnInit {
  searchControl: UntypedFormControl = new UntypedFormControl('');
  results$: Observable<JIssue[]>;
  recentIssues: Signal<JIssue[]>;

  get hasSearchTermInput(): boolean {
    return !!this.searchControl.value;
  }

  constructor(
    private _projectQuery: ProjectQuery,
    private _drawer: NzDrawerRef,
    private _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(debounceTime(50), startWith(this.searchControl.value));
    this.recentIssues = this._projectQuery.recentIssues;
    this.results$ = search$.pipe(
      untilDestroyed(this),
      switchMap((term) => {
        const matchIssues = this._projectQuery.issues().filter((issue) => {
          const foundInTitle = IssueUtil.searchString(issue.title, term);
          const foundInDescription = IssueUtil.searchString(issue.description, term);
          return foundInTitle || foundInDescription;
        });
        return of(matchIssues);
      })
    );
  }

  closeDrawer() {
    this._drawer.close();
  }

  openIssueModal(issue: JIssue) {
    this._modalService.create({
      nzContent: IssueModalComponent,
      nzWidth: 1040,
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        issue$: this._projectQuery.issueById$(issue.id)
      }
    });
    this.closeDrawer();
  }
}
