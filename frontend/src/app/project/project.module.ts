import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BoardPageComponents } from './components/board';
import { NavigationComponents } from './components/navigation';
import { NZ_JIRA_ICONS } from './config/icons';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { JiraControlModule } from '../jira-control/jira-control.module';

@NgModule({
  declarations: [
    ...NavigationComponents,
    ...BoardPageComponents,
    ProjectComponent,
    BoardComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NzIconModule.forChild(NZ_JIRA_ICONS),
    DragDropModule,
    NzToolTipModule,
    ReactiveFormsModule,
    JiraControlModule
  ]
})
export class ProjectModule {}
