import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl = 'https://localhost:7172/api/Shared'; 

  constructor(private http: HttpClient) { }

   // delete all tables
   deleteAllTables(): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${'clear-tables'}`);
  }


}
