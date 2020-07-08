import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';
import { quillConfiguration } from '@trungk18/project/config/editor';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { DateUtil } from '@trungk18/project/utils/date';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ProjectIssueType,
  ProjectIssuePriority,
  ProjectIssueDto,
  ProjectIssueStatus,
  UserDto
} from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  styleUrls: ['./add-issue-modal.component.scss']
})
@UntilDestroy()
export class AddIssueModalComponent implements OnInit {
  reporterUsers$: Observable<UserDto[]>;
  assignees$: Observable<UserDto[]>;
  issueForm: FormGroup;
  editorOptions = quillConfiguration;

  get f() {
    return this.issueForm?.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private _projectService: ProjectService,
    public _projectQuery: ProjectQuery
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.reporterUsers$ = this._projectQuery.users$.pipe(
      untilDestroyed(this),
      tap((users) => {
        let [user] = users;
        if (user) {
          this.f.reporterId.patchValue(user.id);
        }
      })
    );

    this.assignees$ = this._projectQuery.users$;
  }

  initForm() {
    this.issueForm = this._fb.group({
      type: [ProjectIssueType.Task],
      priority: [ProjectIssuePriority.Medium],
      title: ['', NoWhitespaceValidator()],
      description: [''],
      reporterId: [''],
      userIds: [[]]
    });
  }

  submitForm() {
    if (this.issueForm.invalid) {
      return;
    }
    let now = DateUtil.getNow();
    let issue: ProjectIssueDto = {
      ...this.issueForm.getRawValue(),
      id: IssueUtil.getRandomId(),
      status: ProjectIssueStatus.Backlog,
      createdAt: now,
      updatedAt: now
    };

    this._projectService.updateIssue(issue);
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this._modalRef.close();
  }
}
