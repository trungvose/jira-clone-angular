import { TestBed } from '@angular/core/testing';
import { JiraControlModule } from '@trungk18/jira-control/jira-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('JiraControlModule', () => {
  let module: JiraControlModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        JiraControlModule,
        ReactiveFormsModule
      ]
    });
    module = TestBed.inject(JiraControlModule);
  });

  it('should have Jira Control Module', () => {
    expect(module).toBeTruthy();
  });
});
