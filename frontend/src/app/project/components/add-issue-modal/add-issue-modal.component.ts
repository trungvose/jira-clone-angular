import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NoWhitespaceValidator } from '@trungk18/validators/no-whitespace.validator';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { quillConfiguration } from '@trungk18/project/config/editor';

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

  constructor(private _fb: FormBuilder, private _modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.issueForm = this._fb.group({
      title: ['', NoWhitespaceValidator()],
      description: ['']
    });
  }

  submitForm() {
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }
  
  closeModal() {
    this._modalRef.close();
  }
}
