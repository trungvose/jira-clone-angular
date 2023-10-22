import { Component, OnInit, Signal } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IssuePriority, IssueStatus, IssueType, JIssue } from '@trungk18/interface/issue';
import { quillConfiguration } from '@trungk18/project/config/editor';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { JUser } from '@trungk18/interface/user';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';
import { DateUtil } from '@trungk18/project/utils/date';

@Component({
  selector: 'add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  styleUrls: ['./add-issue-modal.component.scss']
})
export class AddIssueModalComponent implements OnInit {
  reporterUsers: Signal<JUser[]>;
  assignees: Signal<JUser[]>;
  issueForm: UntypedFormGroup;
  editorOptions = quillConfiguration;

  get f() {
    return this.issueForm?.controls;
  }

  constructor(
    private _fb: UntypedFormBuilder,
    private _modalRef: NzModalRef,
    private _projectService: ProjectService,
    private _projectQuery: ProjectQuery) {}

  ngOnInit(): void {
    this.initForm();

    this.reporterUsers = this._projectQuery.users;
    const [user] = this._projectQuery.users();
    if (user) {
      this.f.reporterId.patchValue(user.id);
    }

    this.assignees = this._projectQuery.users;
  }

  initForm() {
    this.issueForm = this._fb.group({
      type: [IssueType.TASK],
      priority: [IssuePriority.MEDIUM],
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
    const now = DateUtil.getNow();
    const issue: JIssue = {
      ...this.issueForm.getRawValue(),
      id: IssueUtil.getRandomId(),
      status: IssueStatus.BACKLOG,
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
