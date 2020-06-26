import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { QuillModule } from 'ngx-quill';
import { JiraControlModule } from '../jira-control/jira-control.module';
import { BoardPageComponents } from './components/board';
import { IssueUtilComponents } from './components/issues';
import { NavigationComponents } from './components/navigation';
import { NZ_JIRA_ICONS } from './config/icons';
import { BoardComponent } from './pages/board/board.component';
import { FullIssueDetailComponent } from './pages/full-issue-detail/full-issue-detail.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
    ...NavigationComponents,
    ...BoardPageComponents,
    ...IssueUtilComponents,
    ProjectComponent,
    BoardComponent,
    SettingsComponent,    
    FullIssueDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NzIconModule.forChild(NZ_JIRA_ICONS),
    NzToolTipModule,
    NzModalModule,
    NzDropDownModule,
    DragDropModule,
    TextFieldModule,
    FormsModule,
    ReactiveFormsModule,
    JiraControlModule,
    ContentLoaderModule,
    NzNotificationModule,
    QuillModule
  ]
})
export class ProjectModule {}
