import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JProject } from '@trungk18/interface/project';
import { JUser } from '@trungk18/interface/user';

@Injectable({
  providedIn: 'root'
})
export class JiraApiService {
  constructor(private http: HttpClient) {}

  getProject(): Observable<JProject> {
    return this.http.get<JProject>('/data/project.json');
  }

  login(): Observable<JUser> {
    return this.http.get<JUser>('/data/user.json');
  }
}
