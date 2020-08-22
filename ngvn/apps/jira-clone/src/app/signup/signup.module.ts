import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './signup.component';
import { JiraControlModule } from '@trungk18/jira-control/jira-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JiraCoreModule } from '@trungk18/core/core.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignUpRoutingModule,
    JiraCoreModule,
    JiraControlModule
  ]
})
export class SignUpModule {}
