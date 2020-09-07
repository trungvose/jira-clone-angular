import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectIssueDetailDto } from '@trungk18/core/graphql/service/graphql';
import { quillConfiguration } from '@trungk18/project/config/editor';
import { ProjectService } from '@trungk18/project/state/project/project.service';

@Component({
  selector: 'issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IssueDescriptionComponent implements OnChanges {
  @Input() issue: ProjectIssueDetailDto;
  descriptionControl: FormControl;
  editorOptions = quillConfiguration;
  isEditing: boolean;
  isWorking: boolean;

  constructor(private _projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let issueChange = changes.issue;
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.descriptionControl = new FormControl(this.issue.outputHtml);
    }
  }

  setEditMode(mode: boolean) {
    this.isEditing = mode;
  }

  editorCreated(editor: any) {
    editor.focus && editor.focus();
  }

  convertHtmlToMarkdown(html: string): string {
    return html;
  }

  save() {
    let markdownBody = this.convertHtmlToMarkdown(this.descriptionControl.value);
    this._projectService.updateMarkdown(this.issue.id, markdownBody).subscribe(() => {
      this.setEditMode(false);
    });
  }

  cancel() {
    this.descriptionControl.patchValue(this.issue.outputHtml);
    this.setEditMode(false);
  }

  ngOnInit(): void {}
}
