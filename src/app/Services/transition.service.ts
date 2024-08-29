import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransition } from '../Models/Transitions.model';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  private apiUrl = 'https://localhost:7172/api/Transitions'; // עדכן לכתובת ה-API שלך

  constructor(private http: HttpClient) { }

  // שליפת כל המעברים
  getTransitions(): Observable<ITransition[]> {
    return this.http.get<ITransition[]>(this.apiUrl);
  }

  // שליפת מעבר לפי ID
  getTransition(id: number): Observable<ITransition> {
    return this.http.get<ITransition>(`${this.apiUrl}/${id}`);
  }

  // הוספת מעבר חדש
  addTransition(transition: ITransition): Observable<ITransition> {
    return this.http.post<ITransition>(this.apiUrl, transition);
  }

  // מחיקת מעבר לפי ID
  deleteTransition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

