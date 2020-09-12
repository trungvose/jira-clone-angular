import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectIssueDetailDto } from '@trungk18/core/graphql/service/graphql';
import { ProjectService } from '@trungk18/project/state/project/project.service';

@Component({
  selector: 'issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IssueDescriptionComponent implements OnChanges {
  @Input() issue: ProjectIssueDetailDto;
  descriptionControl: FormControl;
  isEditing: boolean;
  isWorking: boolean;

  constructor(private _projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let issueChange = changes.issue;
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.descriptionControl = new FormControl(this.issue.bodyMarkdown);
    }
  }

  setEditMode(mode: boolean) {
    this.isEditing = mode;
  }

  editorCreated(editor: any) {
    editor.focus && editor.focus();
  }

  save() {
    let markdown = this.descriptionControl.value;
    if (markdown === this.issue.bodyMarkdown) {
      return;
    }
    this._projectService.updateMarkdown(this.issue.id, this.descriptionControl.value).subscribe(() => {
      this.setEditMode(false);
    });
  }

  cancel() {
    this.descriptionControl.patchValue(this.issue.bodyMarkdown);
    this.setEditMode(false);
  }

  ngOnInit(): void {}
}
