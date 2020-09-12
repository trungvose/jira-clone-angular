import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { JiraControlModule } from '@trungk18/shared/jira-control/jira-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { JiraDirectivesModule } from '@trungk18/shared/directives/directives.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JiraDirectivesModule,
    JiraControlModule,
    LoginRoutingModule,
    NzNotificationModule,
  ],
})
export class LoginModule {}
