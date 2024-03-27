import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { JobApplication } from '../model/jobApplication';
import { JobApplicationTrackerService } from '../services/job-application-tracker.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-application-tracker-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './job-application-tracker-list.component.html',
  styleUrl: './job-application-tracker-list.component.scss'
})
export class JobApplicationTrackerListComponent {
  displayedColumns: string[] = ['jobRequisitionId', 'jobTitle', 'jobPostedDate', 'jobDeadlineDate', 'applicationStatus'];
  dataSource = new MatTableDataSource<JobApplication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private jobApplicationService: JobApplicationTrackerService,
              private router: Router) {}

  ngOnInit() {
    this.getJobApplications();
  }

  getJobApplications() {
    this.jobApplicationService.getJobApplicationList().subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching job applications:', error);
      }
    });
  }

  createNewJobApplication() {
    this.router.navigate(['/jobApplicationDetail']);
  }
}
