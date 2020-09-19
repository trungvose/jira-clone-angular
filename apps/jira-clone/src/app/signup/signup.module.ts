import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './signup.component';
import { JiraControlModule } from '@trungk18/shared/jira-control/jira-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JiraDirectivesModule } from '@trungk18/shared/directives/directives.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, ReactiveFormsModule, SignUpRoutingModule, JiraDirectivesModule, JiraControlModule],
})
export class SignUpModule {}
