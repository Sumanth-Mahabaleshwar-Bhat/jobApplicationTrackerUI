import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  register(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, '');
  }
}
