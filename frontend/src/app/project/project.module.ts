import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { JiraControlModule } from '../jira-control/jira-control.module';
import { BoardPageComponents } from './components/board';
import { IssueUtilComponents } from './components/issues';
import { NavigationComponents } from './components/navigation';
import { NZ_JIRA_ICONS } from './config/icons';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    ...NavigationComponents,
    ...BoardPageComponents,
    ...IssueUtilComponents,
    ProjectComponent,
    BoardComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NzIconModule.forChild(NZ_JIRA_ICONS),
    NzToolTipModule,
    NzModalModule,
    NzDropDownModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    JiraControlModule,
    ContentLoaderModule
  ]
})
export class ProjectModule {}
