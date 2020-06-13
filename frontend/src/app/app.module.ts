import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_JIRA_ICONS } from './config/icons';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NavbarLeftComponent } from './views/components/navigation/navbar-left/navbar-left.component';
import { NavigationComponent } from './views/components/navigation/navigation/navigation.component';
import { SidebarComponent } from './views/components/navigation/sidebar/sidebar.component';
import { ProjectComponent } from './views/pages/project/project.component';
import { WorksInProgressComponent } from './views/pages/works-in-progress/works-in-progress.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { SvgDefinitionsComponent } from './views/components/shared/svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './views/components/shared/svg-icon/svg-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    WorksInProgressComponent,
    ProjectComponent,
    NavbarLeftComponent,
    SidebarComponent,
    NavigationComponent,
    SvgDefinitionsComponent,
    SvgIconComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzToolTipModule,
    NzIconModule.forRoot(NZ_JIRA_ICONS),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
