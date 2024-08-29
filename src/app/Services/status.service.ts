import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStatus } from '../Models/Status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiUrl = 'https://localhost:7172/api/Status'; // עדכן לכתובת ה-API שלך

  constructor(private http: HttpClient) { }

  // get list statuses
  getStatuses(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(this.apiUrl);
  }

  // get status by id
  getStatus(id: number): Observable<IStatus> {
    return this.http.get<IStatus>(`${this.apiUrl}/${id}`);
  }

  //get reachable statuses
  getOrphanStatuses(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`${this.apiUrl}/${'get-orphan-statuses'}`);
  }

  // add new status
  addStatus(status: IStatus): Observable<IStatus> {
    console.log(status);
    return this.http.post<IStatus>(this.apiUrl, status);
  }

  // delete status by id
  deleteStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
