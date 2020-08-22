import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { quillConfiguration } from '@trungk18/project/config/editor';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ProjectIssueDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueDescriptionComponent implements OnChanges {
  @Input() issue: ProjectIssueDto;
  descriptionControl: FormControl;
  editorOptions = quillConfiguration;
  isEditing: boolean;
  isWorking: boolean;

  constructor(private _projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let issueChange = changes.issue;
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.descriptionControl = new FormControl(this.issue.summary);
    }
  }

  setEditMode(mode: boolean) {
    this.isEditing = mode;
  }

  editorCreated(editor: any) {
    editor.focus && editor.focus();
  }

  save() {
    this._projectService.updateIssue({
      ...this.issue,
      summary: this.descriptionControl.value
    });
    this.setEditMode(false);
  }

  cancel() {
    this.descriptionControl.patchValue(this.issue.summary);
    this.setEditMode(false);
  }

  ngOnInit(): void {}
}
