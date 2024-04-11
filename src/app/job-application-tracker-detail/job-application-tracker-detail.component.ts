import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobApplicationTrackerService } from '../services/job-application-tracker.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-job-application-tracker-detail',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatGridListModule, MatDatepickerModule, MatSelectModule, MatIconModule, CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './job-application-tracker-detail.component.html',
  styleUrl: './job-application-tracker-detail.component.scss'
})
export class JobApplicationTrackerDetailComponent implements OnInit {
  jobApplicationForm!: FormGroup;
  jobTypes: string[] = ['Part Time', 'Full Time', 'Contract'];
  applicationStatusDropdown: string[] = ['Applied', 'Rejected', 'Shortlisted', 'Interview stage', 'In Progress'];
  isNew: boolean = false;
  jobRequisitionId!: string;

  constructor (private router: Router,
               private jobApplicationService: JobApplicationTrackerService,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               private notificationService: NotificationService) {}

  ngOnInit() {
    this.jobApplicationForm = this.fb.group({
      jobRequisitionId: ['', Validators.required],
      jobTitle: ['', Validators.required],
      jobType: [''],
      jobLocation: [''],
      jobPostedDate: [''],
      companyDescription: [''],
      positionSummary: [''],
      jobDeadlineDate: [''],
      jobAddress: [''],
      referralEmployeeName: [''],
      applicationStatus: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.jobRequisitionId = params['jobRequisitionId'];
      if(this.jobRequisitionId) {
        this.getJobApplicationDetails();
      } else {
        this.isNew = true;
      }
    });
  }

  get jobType() {
    return this.jobApplicationForm.get('jobType');
  }

  onSaveJobApplicationForm() {
    if(this.isNew) {
      if(this.jobApplicationForm.valid) {
        this.jobApplicationService.createJobApplicationDetails(this.jobApplicationForm.value).subscribe({
          next: (response) => {
            if(response) {
              this.jobApplicationForm.reset();
              this.notificationService.onSuccessNotification('Entered Job Application Details saved successfully');
              this.jobRequisitionId = response.jobRequisitionId;
              this.router.navigate(['/jobList/' + this.jobRequisitionId]);
              this.getJobApplicationDetails();
            }
          },
          error: (error) => {
            this.notificationService.onErrorNotification('Error on saving entered Job Application Details');
            console.error('Error creating job application:', error);
          }
        });
      } else {
        this.notificationService.onErrorNotification('Required fields on Job Application Details are missing');
      }
    } else {
      if(this.jobApplicationForm.valid) {
        this.jobApplicationService.updateJobApplicationDetails(this.jobRequisitionId, this.jobApplicationForm.value).subscribe({
          next: (response) => {
            if(response) {
              this.notificationService.onSuccessNotification('Job Application Details updated successfully');
              this.getJobApplicationDetails();
            }
          },
          error: (error) => {
            this.notificationService.onErrorNotification('Error on saving Job Application Details');
            console.error('Error saving job application details:', error);
          }
        });
      } else {
        this.notificationService.onErrorNotification('Required fields on Job Application Details are missing');
      }
    }
  }

  onClose() {
    this.router.navigate(['/jobList']);
  }

  getJobApplicationDetails() {
    this.jobApplicationService.getJobApplicationDetails(this.jobRequisitionId).subscribe({
      next: (response) => {
        this.jobApplicationForm.patchValue(response);
        this.jobApplicationForm.get('jobType')?.setValue(response.jobType);
        this.jobApplicationForm.get('applicationStatus')?.setValue(response.applicationStatus);
      },
      error: (error) => {
        console.error('Error fetching job application details:', error);
      }
    });
  }

  onDeleteJobApplication() {
    this.jobApplicationService.deleteJobApplication(this.jobRequisitionId).subscribe({
      next: (response) => {
        this.notificationService.onSuccessNotification('Job Application Details deleted successfully');
        this.router.navigate(['/jobList']);
      },
      error: (error) => {
        this.notificationService.onErrorNotification('Error deleting Job Application Details');
        console.error('Error deleting job application:', error);
      }
    });
  }
}
