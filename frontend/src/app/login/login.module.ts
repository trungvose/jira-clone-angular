import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { JiraControlModule } from '@trungk18/jira-control/jira-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JiraCoreModule } from '@trungk18/core/core.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JiraCoreModule,
    JiraControlModule,
    LoginRoutingModule
  ]
})
export class LoginModule {}
