import {TestBed} from '@angular/core/testing';
import {WorkInProgressModule} from '@trungk18/work-in-progress/work-in-progress.module';

describe('WorkInProgressModule', () => {
  let module: WorkInProgressModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkInProgressModule]
    });
    module = TestBed.inject(WorkInProgressModule);
  });

  it('should have Work In Progress Module', () => {
    expect(module).toBeTruthy();
  });
});
