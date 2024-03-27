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
}
