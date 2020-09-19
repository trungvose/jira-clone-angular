import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarComponent } from './avatar/avatar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { SvgDefinitionsComponent } from './svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

const JiraControlComponents = [
  SvgDefinitionsComponent,
  SvgIconComponent,
  BreadcrumbsComponent,
  ButtonComponent,
  InputComponent,
  AvatarComponent,
];
@NgModule({
  declarations: JiraControlComponents,
  exports: [...JiraControlComponents, NzIconModule],
  imports: [CommonModule, ReactiveFormsModule],
})
export class JiraControlModule {}
