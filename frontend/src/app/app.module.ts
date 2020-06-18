import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_JIRA_ICONS } from './config/icons';
import { BoardDndListComponent } from './views/components/board/board-dnd-list/board-dnd-list.component';
import { BoardDndComponent } from './views/components/board/board-dnd/board-dnd.component';
import { BoardFilterComponent } from './views/components/board/board-filter/board-filter.component';
import { NavbarLeftComponent } from './views/components/navigation/navbar-left/navbar-left.component';
import { NavigationComponent } from './views/components/navigation/navigation/navigation.component';
import { SidebarComponent } from './views/components/navigation/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './views/components/shared/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './views/components/shared/button/button.component';
import { InputComponent } from './views/components/shared/input/input.component';
import { SvgDefinitionsComponent } from './views/components/shared/svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './views/components/shared/svg-icon/svg-icon.component';
import { BoardComponent } from './views/pages/board/board.component';
import { ProjectComponent } from './views/pages/project/project.component';
import { SettingsComponent } from './views/pages/settings/settings.component';
import { WorksInProgressComponent } from './views/pages/works-in-progress/works-in-progress.component';
import { IssueCardComponent } from './views/components/board/issue-card/issue-card.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    WorksInProgressComponent,
    ProjectComponent,
    NavbarLeftComponent,
    SidebarComponent,
    NavigationComponent,
    SvgDefinitionsComponent,
    SvgIconComponent,
    BoardComponent,
    BreadcrumbsComponent,
    BoardFilterComponent,
    BoardDndComponent,
    SettingsComponent,
    ButtonComponent,
    InputComponent,
    BoardDndListComponent,
    IssueCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzToolTipModule,
    NzIconModule.forRoot(NZ_JIRA_ICONS),
    DragDropModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools,
    AkitaNgRouterStoreModule
  ],
  providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}],
  bootstrap: [AppComponent]
})
export class AppModule {}
