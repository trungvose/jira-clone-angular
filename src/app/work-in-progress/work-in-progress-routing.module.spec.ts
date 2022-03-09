import {TestBed} from '@angular/core/testing';
import {WorkInProgressRoutingModule} from '@trungk18/work-in-progress/work-in-progress-routing.module';


describe('WorkInProgressRoutingModule', () => {
  let module: WorkInProgressRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkInProgressRoutingModule]
    });
    module = TestBed.inject(WorkInProgressRoutingModule);
  });

  it('should have Work In Progress Routing Module', () => {
    expect(module).toBeTruthy();
  });
});
