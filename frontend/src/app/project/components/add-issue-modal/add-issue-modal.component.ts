import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueType, JIssue, IssueStatus } from '@trungk18/interface/issue';
import { quillConfiguration } from '@trungk18/project/config/editor';
import { NoWhitespaceValidator } from '@trungk18/validators/no-whitespace.validator';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';

@Component({
  selector: 'add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  styleUrls: ['./add-issue-modal.component.scss']
})
export class AddIssueModalComponent implements OnInit {
  issueForm: FormGroup;
  editorOptions = quillConfiguration;

  get f() {
    return this.issueForm?.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.issueForm = this._fb.group({
      type: [IssueType.TASK],
      title: ['', NoWhitespaceValidator()],
      description: ['']
    });
  }

  submitForm() {
    let issue: JIssue = {
      id: IssueUtil.getRandomId(),
      status: IssueStatus.BACKLOG,
      reporterId: "",
      userIds: [],
      ...this.issueForm.getRawValue()
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
