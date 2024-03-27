import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationTrackerDetailComponent } from './job-application-tracker-detail.component';

describe('JobApplicationTrackerDetailComponent', () => {
  let component: JobApplicationTrackerDetailComponent;
  let fixture: ComponentFixture<JobApplicationTrackerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationTrackerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobApplicationTrackerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
