import { TestBed } from '@angular/core/testing';

import { JobApplicationTrackerService } from './job-application-tracker.service';

describe('JobApplicationTrackerService', () => {
  let service: JobApplicationTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
