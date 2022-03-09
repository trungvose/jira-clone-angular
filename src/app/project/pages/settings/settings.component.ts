import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@trungk18/project/config/const';
import { JProject, ProjectCategory } from '@trungk18/interface/project';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@UntilDestroy()
export class SettingsComponent implements OnInit {
  project: JProject;
  projectForm: FormGroup;
  categories: ProjectCategory[];
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Settings'];
  }

  constructor(
    private _projectQuery: ProjectQuery,
    private _projectService: ProjectService,
    private _notification: NzNotificationService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.categories = [
      ProjectCategory.BUSINESS,
      ProjectCategory.MARKETING,
      ProjectCategory.SOFTWARE
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
      this.updateForm(project);
    });
  }

  initForm() {
    this.projectForm = this._fb.group({
      name: ['', NoWhitespaceValidator()],
      url: [''],
      description: [''],
      category: [ProjectCategory.SOFTWARE]
    });
  }

  updateForm(project: JProject) {
    this.projectForm.patchValue({
      name: project.name,
      url: project.url,
      description: project.description,
      category: project.category
    });
  }

  submitForm() {
    const formValue: Partial<JProject> = this.projectForm.getRawValue();
    this._projectService.updateProject(formValue);
    this._notification.create(
      'success',
      'Changes have been saved successfully.',
      ''
    );
  }

  cancel() {
    this._router.navigate(['/']);
  }
}
