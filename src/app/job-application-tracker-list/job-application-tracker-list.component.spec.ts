import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationTrackerListComponent } from './job-application-tracker-list.component';

describe('JobApplicationTrackerListComponent', () => {
  let component: JobApplicationTrackerListComponent;
  let fixture: ComponentFixture<JobApplicationTrackerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationTrackerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobApplicationTrackerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
