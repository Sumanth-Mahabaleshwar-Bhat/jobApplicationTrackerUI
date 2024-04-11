import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { JobApplication } from '../model/jobApplication';
import { JobApplicationTrackerService } from '../services/job-application-tracker.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-job-application-tracker-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './job-application-tracker-list.component.html',
  styleUrl: './job-application-tracker-list.component.scss'
})
export class JobApplicationTrackerListComponent {
  displayedColumns: string[] = ['jobRequisitionId', 'jobTitle', 'jobPostedDate', 'jobDeadlineDate', 'applicationStatus'];
  dataSource = new MatTableDataSource<JobApplication>();
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private jobApplicationService: JobApplicationTrackerService,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService) {}

  ngOnInit() {
    this.getJobApplications();
  }

  getJobApplications() {
    this.jobApplicationService.getJobApplicationList().subscribe({
      next: (response) => {
        response.forEach(item => {
          item.jobPostedDate = this.datePipe.transform(new Date(item.jobPostedDate), 'yyyy-MM-dd') || '';
          item.jobDeadlineDate = this.datePipe.transform(new Date(item.jobDeadlineDate), 'yyyy-MM-dd') || '';
        });
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching job applications:', error);
      }
    });
  }

  createNewJobApplication() {
    this.router.navigate(['/jobList/new']);
  }

  navigateToJobApplicationDetail(row: any) {
    this.router.navigate(['/jobList/' + row.jobRequisitionId]);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error logging out user:', error);
      }
    });
  }
}
