import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobApplication } from '../model/jobApplication';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationTrackerService {
  private apiUrl = 'http://localhost:8081/api/v1/jobsList';

  constructor(private http:HttpClient) { }

  getJobApplicationList(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }

  createJobApplicationDetails(jobApplicationDetail: JobApplication): Observable<any> {
    return this.http.post(`${this.apiUrl}`, jobApplicationDetail);
  }

  getJobApplicationDetails(jobRequisitionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${jobRequisitionId}`);
  }

  updateJobApplicationDetails(jobRequisitionId: string, updatedJobApplicationDetail: JobApplication): Observable<any> {
    return this.http.put(`${this.apiUrl}/${jobRequisitionId}`, updatedJobApplicationDetail);
  }

  deleteJobApplication(jobRequisitionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${jobRequisitionId}`);
  }
}
